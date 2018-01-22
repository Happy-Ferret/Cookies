class CookieButton {
  
    async getStorageAsync() {
      var storage = await browser.storage.local.get();
      return storage
    }
  
    get ButtonState() {
      return this.getStorageAsync().then(x => x.buttonState)
    }
  
    set ButtonState(value) {
      return browser.storage.local.set({ buttonState: value })
    }
  
    constructor() {
      this.setup()
    }
  
    async enable() {
      browser.privacy.websites.cookieConfig.set({ value: { behavior: "allow_all" } })
      this.ButtonState = 'turn-off';
      browser.browserAction.setIcon({ path: 'icons/enabled.png', });
    }
  
    async disable() {
      browser.privacy.websites.cookieConfig.set({ value: { behavior: "reject_all" } })
      this.ButtonState = 'turn-on';
      browser.browserAction.setIcon({ path: 'icons/disabled.png', });
    }
  
    async setup() {
      if (await this.ButtonState == undefined) {
        this.ButtonState = "turn-off";
      }
      if (await this.ButtonState == "turn-on") {
        browser.browserAction.setIcon({ path: 'icons/disabled.png', });
      }
      browser.browserAction.onClicked.addListener(async function (tab) {
        var state = await cookieButton.ButtonState;
        switch (state) {
          case 'turn-on':
            cookieButton.enable();
            break;
          case 'turn-off':
            cookieButton.disable();
            break;
          case 'undefined':
            cookieButton.enable();
            break;
        }
      });
    }
  }
  
var cookieButton = new CookieButton();