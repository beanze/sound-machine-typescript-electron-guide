import {app, BrowserWindow} from 'electron';

export default class Main {
    private mainWindow: Electron.BrowserWindow;
    private application: Electron.App;
    
    private constructor() {
        this.application = app;

        this.application.on('window-all-closed', () => this.onWindowAllClosed())
                        .on('ready', () => this.createWiindow())
                        .on('activate', () => this.createWiindow())
   }
    
    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            this.application.quit();
        }
    }  

    private close() {
        this.mainWindow = null;
        console.log('closed')
    }

    private createWiindow() {

        this.mainWindow = new BrowserWindow({
            width: 368,
            height: 700,
            frame: false,
            resizable: true
        })

        BrowserWindow.addDevToolsExtension('/Users/leams/Library/Application\ Support/Google/Chrome/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.2.10_0')

        this.mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');

        this.mainWindow.on('closed', () => this.close())
    }

    static main() {
        const main = new Main()
    }
}
