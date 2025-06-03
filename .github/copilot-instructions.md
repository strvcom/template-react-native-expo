Welcome, Copilot! This file provides context and coding guidelines for assisting in this React Native project. Instructions are
split into two sections. General instructions and project specific instructions. General instructions are shared across all projects,
between members of RN team. They include general good code practices and approached applicable across projects. These should be
updated by changes to RN project template.

Project specific instructions have bigger priority and can override general instructions. These are set up per project
and are updated in a process of project development.

# -------------------------------------------------------------------------------------------------

# GENERAL INSTRUCTIONS

# -------------------------------------------------------------------------------------------------

### About

- This is a React Native app built with Expo and TypeScript.
- Project uses pnpm as a package manager.

### Code quality tools

- Project uses ESLint + Prettier (auto-formatting & rules)

### Code style

- Prefer destructuring for props and objects.
- Use modern TypeScript syntax and features.
- Use arrow functions for components.
- Avoid deprecated or legacy APIs.
- Use `async/await` for asynchronous operations.

### Preferred modules and libraries

- Use `expo-router` for navigation.
- Prefer the usage of Expo libraries when available.

### Chat and communication

- When suggesting code changes in chat, make sure to include imports at the top of the file.

### Animations

- Use react-native-reanimated and Skia for animations and drawing
- Avoid thread jumping in animations to ensure smooth performance.

### Avoid

- Avoid using `any` types. Always use specific types or interfaces.
- Avoid nesting ternary expressions.

# -------------------------------------------------------------------------------------------------

# PROJECT SPECIFIC INSTRUCTIONS

# -------------------------------------------------------------------------------------------------
