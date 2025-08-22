import { Plugin, Notice, App, PluginSettingTab, Setting,  } from 'obsidian'

interface dizzyDinkySettings  {
	dizzySource: string;
}

const DEFAULT_SETTINGS: dizzyDinkySettings = {
	dizzySource: 'https://raw.githubusercontent.com/izzymandias1/obsidian_dizzy/refs/heads/main/images/dinky%20her%20oiter.gif'
}

export default class dizzyDinky extends Plugin {
	settings: dizzyDinkySettings;
	async onload(){
		await this.loadSettings();
		console.log("dizzy loaded.");
		const containerEl = this.addStatusBarItem().createEl('img');
		containerEl.src = this.settings.dizzySource;
		containerEl.style = "max-width: 56px;";
		this.addSettingTab(new dizzyDinkySettings(this.app, this));
	}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
class dizzyDinkySettings extends PluginSettingTab {
	plugin: dizzyDinky;

	constructor(app: App, plugin: dizzyDinky) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Image source')
			.setDesc('Must be from the web (local files is a work in progress!). Needs a restart to take effect.')
			.addText(text => text
				.setPlaceholder('https://www.you-image-source.com')
				.setValue(this.plugin.settings.dizzySource)
				.onChange(async (value) => {
					this.plugin.settings.dizzySource = value;
					await this.plugin.saveSettings();
				}));
	}
}