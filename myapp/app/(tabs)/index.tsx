import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [itens, setItens] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/itens');
      setItens(response.data);
      console.log("nomessSSs", itens);
    };
    fetchData();
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffcbdb', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <FlatList
        data={itens}
        renderItem={({ item }) => (
        <ThemedView>
          <Image source={{ uri: item.foto }} style={{ width: 120, height: 120}}/>
          <Text>{item.nome}</Text>
          <Text>{item.idade}</Text>
        </ThemedView>
        )}
      />
        
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Olá, esse é o meu app</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Experimente</ThemedText>
        <ThemedText>
          Edite <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> para ver as mudanças. Pressione {' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          para abrir as ferramentas do desenvolvedor.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
        Toque na guia Explorar para saber mais sobre o que está incluído neste aplicativo inicial.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Comece do zero</ThemedText>
        <ThemedText>
        Quando você estiver pronto, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> pasta. Isso moverá o {' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> para{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
