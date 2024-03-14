// src/services/fetchData.js
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const fetchData = async (hours = 1) => {
    const now = new Date();
    const past = new Date(now.getTime() - hours * 60 * 60 * 1000);
    const wifiDataCollection = collection(db, 'wifiEstimates');
    const q = query(wifiDataCollection, where('createdAt', '>', past));
    const querySnapshot = await getDocs(q);

    const data: any[] = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
};

export default fetchData;
