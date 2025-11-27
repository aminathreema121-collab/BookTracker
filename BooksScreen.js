
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BookList from '../components/BookList';

export default function BooksScreen({ books, onSelectBook, onDeleteBook }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <BookList
          books={books}
          onSelectBook={onSelectBook}
          onDeleteBook={onDeleteBook}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

