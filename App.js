import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import BooksScreen from './screens/BooksScreen';
import AddBookScreen from './screens/AddBookScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleCreateBook = (bookData) => {
    const newBook = {
      id: Date.now().toString(),
      ...bookData,
    };
    setBooks([...books, newBook]);
  };

  const handleUpdateBook = (id, bookData) => {
    setBooks(books.map((book) => (book.id === id ? { id, ...bookData } : book)));
    setSelectedBook(null);
  };

  const handleSelectBook = (book, navigation) => {
    setSelectedBook(book);
    navigation.navigate('AddBook');
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    if (selectedBook && selectedBook.id === id) {
      setSelectedBook(null);
    }
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
  };

  const addBookOptions = useMemo(() => ({
    title: selectedBook ? 'Edit Book' : 'Add Book',
    tabBarLabel: 'Add Book',
    headerShown: true,
    tabBarShowLabel: true,
  }), [selectedBook]);

  const screenOptions = useMemo(() => ({
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#999',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#333',
    headerTitleStyle: {
      fontWeight: '600',
    },
    headerShown: true,
    tabBarShowLabel: true,
    tabBarShowIcon: true,
    lazy: true,
    unmountOnBlur: false,
  }), []);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Books"
          options={{
            title: 'My Books',
            tabBarLabel: 'Books',
            headerShown: true,
            tabBarShowLabel: true,
          }}
        >
          {(props) => (
            <BooksScreen
              books={books}
              onSelectBook={(book) => handleSelectBook(book, props.navigation)}
              onDeleteBook={handleDeleteBook}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AddBook"
          options={addBookOptions}
        >
          {() => (
            <AddBookScreen
              onSubmitCreate={handleCreateBook}
              onSubmitUpdate={handleUpdateBook}
              selectedBook={selectedBook}
              onCancelEdit={handleCancelEdit}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
