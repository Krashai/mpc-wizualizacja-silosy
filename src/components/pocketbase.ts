import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('http://10.0.0.210:80');
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log('auth changed', auth);
  currentUser.set(pb.authStore.model);
  
});



