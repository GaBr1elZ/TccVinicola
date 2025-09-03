import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Redirecionar imediatamente para a tela de welcome
    router.replace('/welcome');
  }, []);

  return null;
}
