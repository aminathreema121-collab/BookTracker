import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function BookForm({
  onSubmitCreate,
  onSubmitUpdate,
  selectedBook,
  onCancelEdit,
}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('To Read');
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState('');

  // Update form when selectedBook changes
  useEffect(() => {
    if (selectedBook) {
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setStatus(selectedBook.status);
      setRating(selectedBook.rating);
      setNotes(selectedBook.notes || '');
    } else {
      // Clear form when not editing
      setTitle('');
      setAuthor('');
      setStatus('To Read');
      setRating(3);
      setNotes('');
    }
  }, [selectedBook]);

  const handleSubmit = () => {
    if (!title.trim() || !author.trim()) {
      Alert.alert('Validation Error', 'Title and Author are required');
      return;
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      status,
      rating,
      notes: notes.trim() || undefined,
    };

    if (selectedBook) {
      onSubmitUpdate(selectedBook.id, bookData);
    } else {
      onSubmitCreate(bookData);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setAuthor('');
    setStatus('To Read');
    setRating(3);
    setNotes('');
    onCancelEdit();
  };

  const renderStatusButton = (statusValue) => (
    <Pressable
      key={statusValue}
      style={({ pressed }) => [
        styles.statusButton,
        status === statusValue ? styles.statusButtonActive : null,
        pressed && styles.statusButtonPressed,
      ]}
      onPress={() => setStatus(statusValue)}
    >
      <Text
        style={[
          styles.statusButtonText,
          status === statusValue ? styles.statusButtonTextActive : null,
        ]}
      >
        {statusValue}
      </Text>
    </Pressable>
  );

  const renderRatingButton = (ratingValue) => (
    <Pressable
      key={ratingValue}
      style={({ pressed }) => [
        styles.ratingButton,
        rating === ratingValue ? styles.ratingButtonActive : null,
        pressed && styles.ratingButtonPressed,
      ]}
      onPress={() => setRating(ratingValue)}
    >
      <Text
        style={[
          styles.ratingButtonText,
          rating === ratingValue ? styles.ratingButtonTextActive : null,
        ]}
      >
        {ratingValue}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.formSection}>
      {selectedBook ? (
        <Text style={styles.modeLabel}>Editing book</Text>
      ) : (
        <Text style={styles.modeLabel}>Add New Book</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Title *"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Author *"
        value={author}
        onChangeText={setAuthor}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.label}>Status:</Text>
        <View style={styles.statusRow}>
          {renderStatusButton('To Read')}
          {renderStatusButton('Reading')}
          {renderStatusButton('Finished')}
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.label}>Rating:</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((num) => renderRatingButton(num))}
        </View>
      </View>

      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline={false}
      />

      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.primaryButtonText}>
            {selectedBook ? 'Save Changes' : 'Add Book'}
          </Text>
        </Pressable>

        {selectedBook && (
          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.cancelButtonPressed,
            ]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formSection: {
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
  modeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
  },
  statusButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginRight: 8,
  },
  statusButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonPressed: {
    opacity: 0.8,
  },
  statusButtonText: {
    fontSize: 14,
    color: '#333',
  },
  statusButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  ratingContainer: {
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
  },
  ratingButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginRight: 8,
  },
  ratingButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  ratingButtonPressed: {
    opacity: 0.8,
  },
  ratingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingButtonTextActive: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginLeft: 12,
  },
  cancelButtonPressed: {
    opacity: 0.8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

