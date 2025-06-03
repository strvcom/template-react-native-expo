Welcome, Copilot! This file provides context and coding guidelines for assisting with this React Native project. Instructions are divided
into two sections: General Instructions and Project-Specific Instructions. General Instructions are shared across all projects within the
RN team and include best practices applicable across projects. These should be updated as changes are made to the RN project template.

Project-Specific Instructions take precedence and can override General Instructions. These are tailored to the specific needs of the project
and are updated throughout the development process.

# ------------------------ GENERAL INSTRUCTIONS ------------------------

### About

- This is a React Native app built with Expo and TypeScript.
- The project uses pnpm as its package manager.

### Code Quality Tools

- The project uses ESLint and Prettier for auto-formatting and enforcing coding rules.

### Code Style

- Prefer destructuring for props and objects.
- Use modern TypeScript syntax and features.
- Use arrow functions for components.
- Avoid deprecated or legacy APIs.
- Use `async/await` for asynchronous operations.

### Preferred Modules and Libraries

- Use `expo-router` for navigation.
- Prefer the usage of Expo libraries when available.

### Chat and Communication

- When suggesting code changes in chat, ensure imports are included at the top of the file.

### Animations

- Use react-native-reanimated and Skia for animations and drawing.
- Avoid thread jumping in animations to ensure smooth performance.

### Avoid

- Avoid using `any` types. Always use specific types or interfaces.
- Avoid nesting ternary expressions.

# ------------------- PROJECT-SPECIFIC INSTRUCTIONS -----------------------
