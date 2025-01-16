![Adalab](https://beta.adalab.es/resources/images/adalab-logo-155x61-bg-white.png)

# modulo-2-Evaluacion Final -Gabriella Calvano (Nymesia47)

Final project of the Adalab bootcamp, second module. The goal was to create a web application that allows users to search for animes, view search results, and save their favorite animes in local storage. The app features a dynamic interface with the ability to select and deselect animes for a favorites list.

## Basic requirements:

- A search field (text input) and a button to search for anime titles.
- A list to display the search results, showing an image and the title of each anime.

## JS requirement

1. **Search Function:**

   - When the search button is clicked, a request is sent to the API `https://docs.api.jikan.moe/` to retrieve the search results.
   - The results are rendered in the list, displaying the anime image and title.

2. **Image Placeholder:**

   - If an anime image URL is `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`, substitute it with a placeholder image.

3. **Save to Favorite:**

   - Clicking on a list item highlights it and adds it to the favorites section.
   - Saved items persist across searches and are displayed in the favorites section.

4. **Local Storage:**
   - Save favorite items in local storage so that they persist after page reloads.

## Bonus Requirements

1. **Delete Favorite Anime:**

   - Clicking the delete button removes the item from the favorites list and from local storage.

2. **Toggle Favorite Status:**

   - Clicking on an item in the result list add/removes it from favorites.

3. **Highlight Saved Items:**

   - On a new search, items previously saved in the favorites list should be highlighted in the result list.

4. **Delete All Favorites:**

   - Create a "Delete All" button that removes all favorite items from both the list and local storage.

5. **Reset Button:**
   - Create a "Reset" button that clears all search results, removes all favorite items, and clears the local storage, resetting the page to its initial state.

## Bonus requirements:

1. Delete favorite anime: On delete button click remove item from the favorite list and from the localStorage.
2. On click on the item in the result list, add or remove the item from the favorite list.
3. On new search, saved item in the favorite list appear highlighted.
4. Create a delete all button for the favorite list that on click will remove all items from the list and from the localStorage.
5. Create a Reset button for the page that on clcick will reset the page to its initial state, removing all favorite items and search results and clearing the localStorage.

## Project Execution

The page is divided into three sections:

- **Header:** Contains the search input field and the search button.
- **Favorite Section:** Displays the user's favorite animes.
- **Result Section:** Shows the search results.

I used the `fetch` function to retrieve data from the API and a separate function to render the results in the result list. Each result item has an event listener that allows users to click and add the anime to the favorites list, which is saved in an array and in local storage. A function iterates through the array to render the saved favorites in the favorite section.

### Key Functions

- `getDataApi()`: Fetches anime data from the API.
- `renderAnime()`: Renders search results in the result list.
- `handleClickFav()`: Adds/removes an item from the favorites list and local storage.

## Tools Used

- **Adalab Starter Kit:** The project starter template provided by Adalab.
- **Node.js:** JavaScript runtime for building the application.
- **Sass:** Preprocessor for writing clean and manageable CSS.
- **Vite:** A modern development server and bundler for fast builds and reactivity.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to reach out:

- **Maintainer:** Gabriella Calvano
- **Email:** [gabcalvano@gmail.com](mailto:gabcalvano@gmail.com)
- **GitHub:** [Nymesia47](https://github.com/Nymesia47)
