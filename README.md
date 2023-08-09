### Code Snippet Manager

```
git clone https://github.com/sutarmin/automated
cd automated
npm install
npm run start
```

## Assignment

Design and implement a Code Snippet Manager application using Electron, React, and TypeScript. The application should provide the following features:

1. Main Window:
   Display a list of code snippets.
   Allow users to create new snippets, edit existing snippets, and delete snippets.
   Implement search functionality to search for snippets by title or description.
2. Code Snippet Entry:
   Each snippet should have a title, description, and the code snippet itself.
   Include syntax highlighting for the code snippets based on their language.
3. Persistence and Storage:
   Enable the application to persist code snippets using a local storage mechanism (e.g., Electron's built-in storage or a database of your choice).

## `src` folder structure

`data` — Data access entities. In our case just one: List of sinppets.

`lib` — Miscellaneous utilities. Since project isn't very big it's not much there.

`modules` — Reusable UI-pieces of the app. The root of a module is usually a component. Modules may have subcomponents, but shouldn't use subcomponents of each other.

`main` — I copied it from boilerplate and didn't change anything there :)

`renderer/App.tsx` — the folder itself is from boilerplate, but the App.tsx file contains root application component that I used to render all the needed providers.

`pages` — separate folder for root components of each route. Reflects app routing structure.

## Notes

1. Electron app infrastructure was cloned from [electron-react-boilerplate]
2. I didn't worry to much about eslint settings, I was just following the rules, suggested by the boilerplate repo. When it comes to code style, consistency is more important than personal preference, so I'm happy to follow historically established team rules.
3. For the data persistence simple localStorage was used. If that's insufficient for the assignment, let's discuss criteria and I can improve the solution.
4. When styling Chakra UI components in this assignment I used props-based styling. I just wanted to save some time, but in bigger projects I prefer moving styles to a separate file and using styled-components syntax. That separates styling from UI logic and makes code more readable.
5. State is managed using React Context and useState. I decided not to overcomplicate project with state management libraries, but I have worked with several of them.
6. In bigger apps I usually have one more architectural layer — `src/domain`. It incapsulates domain-specific entities and operations on them. But in case of this assignment it felt redundant.

## List of libraries that helped to speed up the development

`@chakra-ui/react` + `@emotion/react`
`@uiw/react-textarea-code-editor`
`react-hook-form`
