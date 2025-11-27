import React from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function BookList({
  books,
  onSelectBook,
  onDeleteBook,
}) {
  const renderBookItem = ({ item }) => {
    const stars = '⭐'.repeat(item.rating);
    const emptyStars = '☆'.repeat(5 - item.rating);
    const displayRating = `${stars}${emptyStars} ${item.rating}/5`;

    const handlePress = (event) => {
      // Check if press was in delete button area (right 25% of row)
      const { locationX } = event.nativeEvent;
      const itemWidth = event.nativeEvent.target?.offsetWidth || 0;
      
      // If press is in the rightmost 25% of the item, it's a delete action
      if (locationX > itemWidth * 0.75) {
        onDeleteBook(item.id);
      } else {
        onSelectBook(item);
      }
    };

    return (
      <Pressable
        style={({ pressed }) => [
          styles.bookItem,
          pressed && styles.bookItemPressed
        ]}
        onPress={handlePress}
      >
        <View style={styles.bookContent}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>by {item.author}</Text>
          <View style={styles.bookMeta}>
            <Text style={styles.bookStatus}>Status: {item.status}</Text>
            <Text style={styles.bookRating}>{displayRating}</Text>
          </View>
          {item.notes ? (
            <Text style={styles.bookNotes} numberOfLines={1}>
              Notes: {item.notes}
            </Text>
          ) : (
            <Text style={styles.bookNotesEmpty}>No notes</Text>
          )}
        </View>
        
        {/* FIXED: Delete is just visual text, press handled by parent Pressable */}
        <View style={styles.deleteButton} pointerEvents="none">
          <Text style={styles.deleteButtonText}>Delete</Text>
        </View>
      </Pressable>
    );
  };

  if (books.length === 0) {
    return (
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Books (0)</Text>
        <Text style={styles.emptyText}>No books found. Add your first book!</Text>
      </View>
    );
  }

  return (
    <View style={styles.listSection}>
      <Text style={styles.sectionTitle}>Books ({books.length})</Text>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  bookItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  bookItemPressed: {
    opacity: 0.7,
  },
  bookContent: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bookStatus: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  bookRating: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '500',
  },
  bookNotes: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
  bookNotesEmpty: {
    fontSize: 12,
    color: '#ccc',
    fontStyle: 'italic',
    marginTop: 4,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    padding: 20,
  },
});

