// db.ts
const DB_NAME = 'ahmed-elmosalamy-audio-db';
const DB_VERSION = 1;
const STORE_NAME = 'audio-clips';

let db: IDBDatabase;

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(true);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const dbInstance = request.result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(true);
    };

    request.onerror = () => {
      console.error('Error opening DB:', request.error);
      reject('Error opening DB');
    };
  });
};

export const saveAudio = (id: number, blob: Blob): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject('DB not initialized');
    }
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id, blob });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      console.error('Error saving audio:', request.error);
      reject('Error saving audio');
    };
  });
};

export const getAudio = (id: number): Promise<Blob | undefined> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject('DB not initialized');
    }
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result?.blob);
    };

    request.onerror = () => {
      console.error('Error getting audio:', request.error);
      reject('Error getting audio');
    };
  });
};

export const getDownloadedIds = (): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject('DB not initialized');
    }
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAllKeys() as IDBRequest<IDBValidKey[]>;

    request.onsuccess = () => {
      resolve(request.result.map(key => Number(key)));
    };

    request.onerror = () => {
      console.error('Error getting all keys:', request.error);
      reject('Error getting all keys');
    };
  });
};
