// @ts-ignore
const IDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
    // @ts-ignore
    IDBTrans = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
    dbVersion = 5,
    dbName = 'tooqing';


// https://hacks.mozilla.org/2012/02/storing-images-and-files-in-indexeddb/

export class Idb {
    idb;
    constructor() {
        const self = this;
        // 链接数据库

        const req = IDB.open(dbName, dbVersion);
        req.onerror = (ev) => {
            console.error(ev);
        }
        req.onsuccess = (ev) => {
            console.info(`Request succeed.`);
            self.idb = ev.target.result;
            self.idb.onerror = (e) => {
                console.error("Error creating/accessing IndexedDB database");
            }

            // download image
            self.pullImg((blob) => {
                self.putToDB("key_01", blob);
            });
        }
        //构建数据库
        // 该事件仅在较新的浏览器中实现了  https://caniuse.com/#search=onupgradeneeded
        req.onupgradeneeded = (ev) => {
            self.createObjectStore(ev.target.result);
        }
    }

    createObjectStore(db) {
        console.log(db.version);
        console.log(db);
        db.createObjectStore("images");
    };

    pullImg(callback: Function) {
        let xhr = new XMLHttpRequest(),
            blob;

        xhr.open("GET", "https://osd-alpha.tooqing.com/d40f8e9310c78e74eca40187a0e5d61a.png", true);
        xhr.responseType = "blob";

        xhr.addEventListener("load", () => {
            if (xhr.status == 200) {
                console.info("Image retrieved");

                blob = xhr.response;
                console.log(`Blob: ${blob}`);

                if (callback) callback(blob);
            }
        }, false);
        xhr.send();
    }
    putToDB(key, blob) {
        const trans = this.idb.transaction("images", "readwrite");

        // Put the blob into the database
        trans.objectStore("images").put(blob, key);
    }

}

