PuMuKIT Atto plugin for Moodle
==============================

This plugin allows PuMuKIT integration on Atto editor.

If you want to develop for this plugin see [DEVELOP DOC](https://github.com/teltek/moodle-atto_pumukitmedia/blob/master/DEVELOPER.md) 

[IMPORTANT] Before install this plugin installs [PuMuKIT Filter](https://github.com/teltek/moodle-filter_pumukitmedia/)

## How to install

### Step 1: Clone the latest code version from GitHub
```
git clone https://github.com/teltek/moodle-atto_pumukitmedia pumukitmedia
```

### Step 2: Create .zip to install

Move to downloaded folder and execute the following command.
```
zip -r moodle-atto_pumukitmedia.zip pumukitmedia -x "pumukitmedia/.git/*" -x "pumukitmedia/.github/*" -x "pumukitmedia/.gitignore" 
```

### Step 3: Upload and configure

Upload .zip on Moodle -> Administration -> Plugins -> Install.

Configure the plugin with your [PuMuKIT data password and PuMuKIT domain](https://github.com/teltek/PumukitLmsBundle/blob/master/Resources/doc/Configuration.md)

### Step 4: Activate plugin on Atto Editor

Go to Moodle -> Administration -> Plugin -> Atto HTML editor -> Settings.

Search configuration for: Toolbar config

Add on "files" line the "pumukitmedia" key.

```
files = emojipicker, image, media, recordrtc, managefiles, h5p, pumukitmedia
```

Save and the plugin will be ready to use.
