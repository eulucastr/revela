import { app, BrowserWindow, ipcMain, dialog, protocol, net } from 'electron';
import path from 'path';
import fs from 'fs';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

app.whenReady().then(() => {
  protocol.handle('atom', (request) => {
    const filePath = decodeURIComponent(request.url.slice('atom://'.length));
    // Check if path is absolute, otherwise handle appropriately
    return net.fetch('file:///' + filePath);
  });
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// IPC Handlers
ipcMain.handle('select-library', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  });
  if (result.canceled) {
    return null;
  } else {
    return result.filePaths[0];
  }
});

ipcMain.handle('list-galleries', async (event: any, libraryPath: string) => {
  try {
    const folders = fs.readdirSync(libraryPath, { withFileTypes: true })
      .filter((dirent: fs.Dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'))
      .map((dirent: fs.Dirent) => dirent.name);
    return folders;
  } catch (error) {
    console.error('Failed to list galleries:', error);
    return [];
  }
});

ipcMain.handle('create-gallery', async (event: any, { libraryPath, name }: { libraryPath: string, name: string }) => {
  try {
    const galleryPath = path.join(libraryPath, name);
    const metaPath = path.join(galleryPath, '.meta');

    if (!fs.existsSync(galleryPath)) {
      fs.mkdirSync(galleryPath);
    }

    if (!fs.existsSync(metaPath)) {
      fs.mkdirSync(metaPath);
      fs.writeFileSync(path.join(metaPath, 'album.json'), JSON.stringify({ photos: [], template: 'default' }));
      fs.writeFileSync(path.join(metaPath, 'captions.json'), JSON.stringify({}));
    }

    return true;
  } catch (error) {
    console.error('Failed to create gallery:', error);
    return false;
  }
});

ipcMain.handle('list-photos', async (event: any, galleryPath: string) => {
  try {
    const files = fs.readdirSync(galleryPath, { withFileTypes: true })
      .filter((dirent: fs.Dirent) => dirent.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(dirent.name))
      .map((dirent: fs.Dirent) => dirent.name);
    return files;
  } catch (error) {
    console.error('Failed to list photos:', error);
    return [];
  }
});

ipcMain.handle('get-album-meta', async (event: any, galleryPath: string) => {
  try {
    const metaPath = path.join(galleryPath, '.meta', 'album.json');
    if (fs.existsSync(metaPath)) {
      return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    }
    return { photos: [], template: 'default' };
  } catch (error) {
    console.error('Failed to get album meta:', error);
    return { photos: [], template: 'default' };
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
