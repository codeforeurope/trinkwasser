# Status
[![David](https://david-dm.org/codeforeurope/trinkwasser.svg)](https://david-dm.org/codeforeurope/trinkwasser)

# Drinking water visualization: Hardness, contents and cost

* In the converter/ folder, you find raw data and small scripts that will process the rawdata into a model for the website
* In the src/ folder, you will find HTML, CSS und JavaScript that will visualize the drinkingwater information.
* When you use grunt, a build directory will be created with translated sections for all supported languages.

# i18n

This project uses transifex for translation. Translations can be found or created at https://www.transifex.com/codeforeurope/trinkwasser/languages/
Please install the transifex client to pull languages.
Install your login credentials to ~/.transifexrc

```bash
[https://www.transifex.com]
hostname = https://www.transifex.com
password = pwd
token =
username = username
```

# To pull down locale

```bash
tx pull -a
```

# After editing localisation changes in lang/locale/{lang}

If you not in the language team you will not be able to push to transifex. If you do have transifex set up correctly; delete the other languages before saving the .po file you edited and executing.

```bash
tx push -t
```

# Run

```bash
npm install .
npm start
```

# Git 

before pushing your changes please do a pull request

```bash
git pull https://github.com/codeforeurope/trinkwasser.git master
```

# Sources:

* Stadtwerke Heilbronn: https://www.stadtwerke-heilbronn.de/index/hsw/Wasserh%C3%A4rte.html
* Stadtwerke Neckarsulm: http://www.sw-neckarsulm.de/main/produkte/trinkwasser/wasseranalyse.html
