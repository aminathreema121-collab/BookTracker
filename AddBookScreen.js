import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BookForm from '../components/BookForm';

export default function AddBookScreen({
  onSubmitCreate,
  onSubmitUpdate,
  selectedBook,
  onCancelEdit,
}) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <BookForm
          onSubmitCreate={onSubmitCreate}
          onSubmitUpdate={onSubmitUpdate}
          selectedBook={selectedBook}
          onCancelEdit={onCancelEdit}
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

