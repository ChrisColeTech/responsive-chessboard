# Build System

This project has automatic building set up for both the component and example app.

## Available Scripts

### Development (Hot Reloading)

- `npm run dev` - Start Vite dev server for component development only
- `npm run dev:example` - Start example app dev server only  
- `npm run dev:both` - **Recommended**: Run both dev servers in parallel with hot reloading

### Building

- `npm run build` - **Fast**: Just TypeScript compilation (development build)
- `npm run build:prod` - **Slow**: Full production build with optimization
- `npm run build:example` - **Fast**: Just compile example app TypeScript
- `npm run build:example:prod` - **Slow**: Full production build of example app
- `npm run build:with-example` - **Slow**: Full production build of both projects

### Recommended Development Workflows

1. **Daily Development** (Recommended): `npm run dev:both`
   - Both projects run with hot reloading
   - No building needed, fastest iteration

2. **Component Development**: `npm run build` 
   - **Fast** TypeScript compilation only
   - Good for component development and testing
   - **Note**: Example app needs `build:prod` for clean imports

3. **Example App Testing**: `npm run build:for-example`
   - Builds component with Vite bundling + reinstalls in example
   - Required for testing example app (due to clean import syntax)
   - Use when you want to test changes in the example app

4. **Production Build**: `npm run build:prod`
   - **Slow** but creates optimized, minified bundles  
   - Required for publishing component to npm
   - Creates the bundled files for distribution

5. **Full Production Build**: `npm run build:with-example`
   - **Slowest** - builds both projects for production  
   - Use when preparing everything for deployment

## File Watching

The build system automatically:
- ✅ Builds example app when you build the component
- ✅ Watches TypeScript files for changes
- ✅ Hot reloads both projects in development
- ✅ Provides colored output for easy debugging

## Project Structure

```
responsive-chessboard/
├── src/                 # Component source
├── dist/               # Component build output  
├── example-v2/
│   ├── src/            # Example app source
│   └── dist/           # Example app build output
```