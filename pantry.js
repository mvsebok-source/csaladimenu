(function () {
    const preparationPrefixes = [
        /^(?:frissen\s+)?(?:durvára\s+(?:tört|vágott)|finomra\s+reszelt|apróra\s+vágott)\s+/i,
        /^(?:szeletelt|vágott)(?:\s+(?:vagy|és)\s+(?:szeletelt|vágott))?\s+/i,
        /^(?:friss|frissen|reszelt|őrölt|darált|főtt|sült|nyers|hámozott|kockázott|darabolt|aprított|szárított|fagyasztott|érett|egész|hideg|langyos|meleg|forró|olvasztott|puha|felvert|szobahőmérsékletű|enyhe)\s+/i
    ];
    const preparationSuffixes = [
        /(?:,\s*|\s+)(?:lereszelve|reszelve|felaprítva|aprítva|összezúzva|zúzva|szeletelve|felkockázva|kockázva|meghámozva|hámozva|összetörve)\s*$/i,
        /\s+(?:a|az)\s+(?:sütéshez|főzéshez|tálaláshoz|pirításhoz|kenéshez|díszítéshez|tetejére|töltelékbe|töltelékhez|sziruphoz|öntethez|tésztához|habba|rouxhoz|szószhoz|mártáshoz|mártogatóba|kikenéséhez)\s*$/i
    ];
    const quickPickKeys = [
        'vöröshagyma', 'fokhagyma', 'burgonya', 'tojás',
        'tej', 'tejföl', 'rizs', 'paradicsom', 'csirkemellfilé'
    ];

    function normalizeSearchText(value) {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase('hu')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function canonicalize(value) {
        let label = String(value)
            .replace(/\([^)]*\)/g, ' ')
            .replace(/[;,]\s*(?:elhagyható|ízlés szerint)\b/gi, ' ')
            .trim();

        preparationSuffixes.forEach(pattern => {
            let previous;
            do {
                previous = label;
                label = label.replace(pattern, '').trim();
            } while (label !== previous);
        });

        let previous;
        do {
            previous = label;
            preparationPrefixes.forEach(pattern => {
                label = label.replace(pattern, '').trim();
            });
        } while (label !== previous);

        label = label.replace(/^savanykás\s+(?=alma\b)/i, '');
        label = label.replace(/^[,;\s]+|[,;\s]+$/g, '').replace(/\s+/g, ' ').trim();

        return {
            key: normalizeSearchText(label),
            label
        };
    }

    function create(options) {
        const { recipes, selectedIngredients, getIngredientName, onChange } = options;
        const groups = new Map();

        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                const name = getIngredientName(ingredient);
                if (normalizeSearchText(name) === 'hus') return;

                const canonical = canonicalize(name);
                if (!canonical.key || canonical.key === 'hus') return;

                let group = groups.get(canonical.key);
                if (!group) {
                    group = { key: canonical.key, label: canonical.label, count: 0 };
                    groups.set(canonical.key, group);
                }
                group.count += 1;

                if (canonical.label.length < group.label.length) group.label = canonical.label;
            });
        });

        const allGroups = [...groups.values()].sort((a, b) => a.label.localeCompare(b.label, 'hu'));
        const quickGroups = quickPickKeys
            .map(key => groups.get(normalizeSearchText(key)))
            .filter(Boolean);
        const suggestedGroups = quickGroups.length
            ? quickGroups
            : [...allGroups].sort((a, b) => b.count - a.count).slice(0, 9);

        const container = document.getElementById('ingredients-container');
        const clearButton = document.getElementById('clear-ingredients');
        const selectedCount = document.getElementById('pantry-count');
        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-3';

        const helperText = document.createElement('p');
        helperText.className = 'text-xs text-slate-500';
        helperText.textContent = 'Jelöld be, ami megvan. A receptek ezek közül legalább egyhez illenek; a reszelt, szeletelt és darabolt forma ugyanaz az alapanyag.';

        const selectedList = document.createElement('div');
        selectedList.className = 'flex flex-wrap gap-2';
        selectedList.setAttribute('aria-live', 'polite');
        selectedList.setAttribute('aria-label', 'Kiválasztott otthoni alapanyagok');

        const searchLabel = document.createElement('label');
        searchLabel.className = 'sr-only';
        searchLabel.htmlFor = 'pantry-search';
        searchLabel.textContent = 'Alapanyag keresése';

        const searchInput = document.createElement('input');
        searchInput.id = 'pantry-search';
        searchInput.type = 'search';
        searchInput.autocomplete = 'off';
        searchInput.placeholder = 'Alapanyag keresése, például alma';
        searchInput.className = 'w-full sm:max-w-md bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500';

        const suggestionHeading = document.createElement('p');
        suggestionHeading.className = 'text-xs font-semibold text-slate-500';
        suggestionHeading.textContent = 'Gyakori alapanyagok';

        const quickList = document.createElement('div');
        quickList.className = 'flex flex-wrap gap-2';

        const searchStatus = document.createElement('p');
        searchStatus.className = 'text-xs text-slate-500';
        searchStatus.setAttribute('role', 'status');
        searchStatus.setAttribute('aria-live', 'polite');

        const searchResults = document.createElement('div');
        searchResults.className = 'flex flex-wrap gap-2';

        wrapper.append(helperText, selectedList, searchLabel, searchInput, suggestionHeading, quickList, searchStatus, searchResults);
        container.replaceChildren(wrapper);

        function makeIngredientButton(group, isSelected) {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('aria-pressed', String(isSelected));
            button.className = `text-xs px-3 py-2 rounded-xl border font-semibold transition ${isSelected ? 'bg-brand-600 text-white border-brand-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`;
            button.textContent = isSelected ? `${group.label} ×` : `+ ${group.label}`;
            button.onclick = () => {
                if (selectedIngredients.has(group.key)) selectedIngredients.delete(group.key);
                else selectedIngredients.add(group.key);
                render();
                onChange();
            };
            return button;
        }

        function renderSelected() {
            selectedList.replaceChildren();
            const selectedGroups = allGroups.filter(group => selectedIngredients.has(group.key));
            clearButton.classList.toggle('hidden', selectedGroups.length === 0);
            selectedCount.textContent = `${selectedGroups.length} kiválasztva`;

            if (!selectedGroups.length) {
                const emptyState = document.createElement('p');
                emptyState.className = 'text-xs text-slate-400';
                emptyState.textContent = 'Még nincs kiválasztott alapanyag.';
                selectedList.appendChild(emptyState);
                return;
            }

            selectedGroups.forEach(group => selectedList.appendChild(makeIngredientButton(group, true)));
        }

        function renderSuggestions() {
            const query = canonicalize(searchInput.value).key || normalizeSearchText(searchInput.value);
            quickList.replaceChildren();
            searchResults.replaceChildren();

            if (!query) {
                suggestionHeading.classList.remove('hidden');
                searchStatus.textContent = '';
                suggestedGroups.forEach(group => {
                    quickList.appendChild(makeIngredientButton(group, selectedIngredients.has(group.key)));
                });
                return;
            }

            suggestionHeading.classList.add('hidden');
            const availableGroups = allGroups.filter(group => !selectedIngredients.has(group.key));
            const exactMatches = availableGroups.filter(group =>
                group.key === query || group.key.split(' ').includes(query)
            );
            const matches = exactMatches.length
                ? exactMatches
                : availableGroups.filter(group => group.key.includes(query));
            const visibleMatches = matches.slice(0, 8);
            visibleMatches.forEach(group => {
                searchResults.appendChild(makeIngredientButton(group, false));
            });

            if (!matches.length) {
                searchStatus.textContent = 'Nincs ilyen alapanyag. Próbálj rövidebb keresést.';
            } else if (matches.length > visibleMatches.length) {
                searchStatus.textContent = `${matches.length} találat — az első ${visibleMatches.length} látható. Pontosíts a keresésen.`;
            } else {
                searchStatus.textContent = `${matches.length} találat`;
            }
        }

        function render() {
            renderSelected();
            renderSuggestions();
        }

        searchInput.addEventListener('input', renderSuggestions);
        clearButton.onclick = () => {
            selectedIngredients.clear();
            render();
            onChange();
        };
        render();

        return {
            matches: ingredientName => selectedIngredients.has(canonicalize(ingredientName).key)
        };
    }

    window.PantryPicker = { create };
})();
