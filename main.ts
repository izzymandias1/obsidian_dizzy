import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface dizzyDinkySettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: dizzyDinkySettings = {
	mySetting: 'default'
}

export default class dizzyDinky extends Plugin {
	settings: dizzyDinkySettings;

	async onload() {
		await this.loadSettings();
		const dizzyRibbon = this.addRibbonIcon('dice', 'dizzy', (evt: MouseEvent) => {
			var img = "images/dinky her oiter.gif";
			new Notice(img);	
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: dizzyDinky;

	constructor(app: App, plugin: dizzyDinky) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
