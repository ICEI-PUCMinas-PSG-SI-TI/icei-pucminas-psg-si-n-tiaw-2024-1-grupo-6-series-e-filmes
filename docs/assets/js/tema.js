const inputContainer = document.querySelector('input[name="theme"]');
        const rootElement = document.documentElement;

        window.onload = getThemeFromLocalStorage;

        const darkTheme = {
            '--background-color': '#131313',
            '--text-color': '#ffffff',
            '--icon-geral-cor': '#EF1600',
            '--icon1-cor': '#EF1600',
            '--icon2-cor': '#ED4A02',
            '--icon3-cor': '#EC8F03',
            '--icon4-cor': '#CF205D',
        };

        const lightTheme = {
            '--background-color': '#1D0E24',
            '--text-color': '#EFF5F1',
            '--icon-geral-cor': '#7D4EFA',
            '--icon1-cor': '#FAEC4D',
            '--icon2-cor': '#7A6AA5',
            '--icon3-cor': '#B3FA4D',
            '--icon4-cor': '#4D7CFA',
        };

        inputContainer.addEventListener('change', function() {
            const isChecked = inputContainer.checked;
            isChecked ? changeTheme(lightTheme) : changeTheme(darkTheme);
        });

        function changeTheme(theme) {
            for (let [prop, value] of Object.entries(theme)) {
                changeProperty(prop, value);
            }
            saveThemeToLocalStorage(theme);
        }

        function changeProperty(property, value) {
            rootElement.style.setProperty(property, value);
        }

        function saveThemeToLocalStorage(theme) {
            localStorage.setItem('theme', JSON.stringify(theme));
            localStorage.setItem('isChecked', inputContainer.checked);
        }

        function getThemeFromLocalStorage() {
            const savedTheme = JSON.parse(localStorage.getItem('theme'));
            const isChecked = JSON.parse(localStorage.getItem('isChecked'));

            if (savedTheme) {
                changeTheme(savedTheme);
            }
            if (isChecked !== null) {
                inputContainer.checked = isChecked;
            }
        }

        getThemeFromLocalStorage();