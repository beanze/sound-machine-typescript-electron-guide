import {app, BrowserWindow} from 'electron';

export default class Main {
    private mainWindow: Electron.BrowserWindow;
    private application: Electron.App;
    
    private constructor() {
        this.application = app;

        this.application.on('window-all-closed',this.onWindowAllClosed);
        this.application.on('ready', this.createWiindow);
        this.application.on('activate', this.createWiindow)
   }
    
    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            this.application.quit();
        }
    }

    private close() {
        this.mainWindow = null;
    }

    private createWiindow() {
        // this is a dependency we will have to live with
        // because we can't create BrowserWindow until
        // onReady fires.
        this.mainWindow = new BrowserWindow({
            width: 368,
            height: 700,
            frame: false,
            resizable: true
        })

        BrowserWindow.addDevToolsExtension('/Users/leams/Library/Application\ Support/Google/Chrome/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.2.10_0')

        this.mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');

        const self = this;

        this.mainWindow.on('closed', () => {
            self.close()
        });
    }

    static main() {
        const main = new Main()
    }
}


