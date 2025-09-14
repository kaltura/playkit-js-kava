# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

PlayKit JS Kava is a plugin for the Kaltura Player that integrates Kava (Kaltura Advanced Video Analytics). Its main purpose is to track and collect various events and data about the video player, such as playback events, user interactions, and error states.

## Build and Development Commands

### Installation
```bash
yarn install
```

### Build
```bash
# Build for production with type definitions
yarn build

# Build for production only
yarn build:prod

# Generate TypeScript type definitions
yarn build:types
```

### Development
```bash
# Start development server with auto-reload
yarn serve

# Watch mode for development
yarn watch

# Type checking
yarn type-check
yarn type-check:watch

# Linting
yarn lint
yarn lint:fix

# Format code with Prettier
yarn prettier
```

### Testing
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests in debug mode
yarn test:debug

# Run tests in specific browsers
yarn run test:chrome
yarn run test:firefox
yarn run test:safari
```

## Codebase Architecture

### Core Components

1. **Kava Plugin (`src/kava.ts`)**: 
   - Main plugin class that integrates with the Kaltura Player
   - Handles player event binding and analytics reporting
   - Implements lifecycle methods (constructor, destroy, reset, loadMedia)

2. **Kava Model (`src/kava-model.ts`)**: 
   - Data model that stores and manages analytics data
   - Provides getters for all tracked metrics
   - Updates model data when events occur

3. **Event Models**:
   - `src/kava-event-model.ts`: Defines player-related events (playback, errors, etc.)
   - `src/application-events-model.ts`: Defines application-level events (UI interactions, feature usage)

4. **Event Handlers**:
   - `src/kava-rate-handler.ts`: Handles bitrate tracking and calculations
   - `src/kava-timer.ts`: Manages timing for periodic analytics reporting

5. **Utility Classes**:
   - `src/log-failed-live-events.ts`: Logs failed analytics events for live streams to localStorage

### Data Flow

1. The Kava plugin initializes and binds to player events
2. When events occur, event handlers process the data
3. The Kava model is updated with new metrics
4. Analytics events are sent to the Kaltura analytics service at regular intervals
5. For live streams, failed analytics events are logged to localStorage

### Configuration

The plugin is configured through the Kaltura Player configuration object:

```javascript
{
  plugins: {
    kava: {
      serviceUrl: '//analytics.kaltura.com/api_v3/index.php',
      partnerId: 1234,
      entryId: 'entry-id',
      viewEventCountdown: 10,
      // other configuration options...
    }
  }
}
```

## Key Files and Their Purpose

- `src/index.ts`: Entry point that registers the Kava plugin with the Kaltura Player
- `src/kava.ts`: Main plugin implementation
- `src/kava-model.ts`: Data model for storing analytics data
- `src/kava-event-model.ts`: Defines player event types and models
- `src/application-events-model.ts`: Defines application event types and models
- `src/kava-timer.ts`: Handles timing for periodic analytics reporting
- `src/kava-rate-handler.ts`: Tracks and calculates bitrate statistics
- `src/log-failed-live-events.ts`: Logs failed analytics events to localStorage
- `src/enums/`: Contains enum definitions used throughout the codebase
- `src/types/`: TypeScript type definitions

## Important Concepts

1. **Analytics Events**: The plugin tracks various events like playback progress, user interactions, and errors. Each event has a specific model and is sent to the analytics service.

2. **Event Buckets**: Events are categorized into buckets (PlayerEvents, ApplicationEvents) for different types of analytics reporting.

3. **View Events**: Periodic events sent at regular intervals to track ongoing playback and player state.

4. **Session Management**: The plugin maintains a session and can reset it after a configurable timeout.

5. **Error Handling**: Failed analytics events for live streams can be logged to localStorage for later analysis.

6. **Plugin Registration**: The plugin registers with the Kaltura Player and becomes accessible through `player.plugins.kava`.
