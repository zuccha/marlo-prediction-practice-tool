# Practice Tool for Marlo's Prediction

This is a tool for practicing a variant of Marlo's Prediction as presented by Tom Matriq on his YouTube channel ([video](https://www.youtube.com/watch?v=Fa84HtYSjsU)).

<img src="/docs/app.png" />

## How it works

The tool deals cards automatically so that you can practice several random configurations in little time, focusing on identifying the correct way for reaching the prediction card.

Cards are dealt one per pile as instructed in the tutorial video.

### Commands

The tool supports the following commands:

- **Start/Stop**: Start, pause, and resume dealing cards automatically, as if somebody would be dealing cards in front of you.
- **Deal All**: Deal all cards left in the deck at once (useful once the prediction card has already been dealt).
- **Deal Next**: Manually deal the next card in the deck (available only if the tool is not automatically dealing cards).
- **Reset**: Reshuffle all cards in the deck, interrupting automatic dealing if it was ongoing.

### Stats

The tool provides some information useful for understanding where the prediction card is located:

- **Pile**: Number of the pile in which the prediction card is located. "n/a" if the prediction card has not been dealt yet.
- **Distance from top**: How many cards you need to count from the top of the pile to reach the prediction card (prediction card included). "n/a" if the prediction card has not been dealt yet.
- **Distance from bottom**: How many cards you need to count from the bottom of the pile to reach the prediction card (prediction card included). "n/a" if the prediction card has not been dealt yet.
- **Cards left in deck:** How many cards are left in the deck, yet to be dealt.

In addition to that, it is possible to hover cards to see them. Hovering cards will also provide information about the values and words you can spell when going for the prediction card.

### Settings

These settings allow to tweak the behavior of the tool:

- **Prediction card**: Rank and suit of the card you want to predict (used for highlighting it, and for counting its distance from top/bottom of the pile).
- **Dealing speed (ms)**: How much time passes (in milliseconds) between dealing one card and another during automatic dealing. If for some reason the provided value is not a number, the default 500ms will be used. **N.B.:** You need to stop and resume automatic dealing for a change to take effect if changed while dealing.
- **Cards offset (px)**: How many pixels of each card in the pile are visible.
- **Overlap cards completely**: If true, you will only see the card on top of each pile (as if all the others are hidden behind). When turned on, hovering cards is disabled.
- **Highlight prediction card**: If true, the prediction card will be highlighted with a blue border once dealt.
- **Show prediction card distance**: If true, the stats for the pile, distance from top, and distance from bottom will be visible, otherwise "\<hidden>" will appear.
- **Show cards left in deck**: If true, the stat for showing the number of cards left in the deck will be visible, otherwise "\<hidden>" will appear.
- **Elevate cards on hover**: If true, a hovered card will be displayed on top of others, otherwise nothing will happen on hover.
- **Show cards values on hover**: If true, the cards values will be visible while hovering a card, otherwise not. **N.B.:** Card values will not be visible even if this setting is true if _Elevate cards on hover_ is disabled.

Notice that settings will be reset each time the application is closed.

### Resources

This tool works in combination with the tutorial for the trick:

- [Tutorial video](https://www.youtube.com/watch?v=Fa84HtYSjsU)

## Source code

The following application has been built using [Tauri](https://tauri.app/), [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), and [Vite](https://vitejs.dev/).

### Prerequisites

To build the project, make sure you have installed:

- [Rust](https://www.rust-lang.org/)
- [NPM 8.6.0](https://www.npmjs.com/)
- [Node 18](https://nodejs.org/en/)

For more, check Tauri's [Getting Started](https://tauri.app/v1/guides/getting-started/prerequisites) guide.

### Recommended IDE Setup

Tauri recommends using VS Code with plugins for Tauri and Rust Analyzer:

- [VS Code](https://code.visualstudio.com/)
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Build and run

Run the application with:

```bash
npm run tauri dev
```

To build an app (or installer) for your operating system, run:

```bash
npm run tauri build
```

## Credits

This application has been created by [Amedeo Zucchetti](https://zuccha.io/).

The magic trick was presented by [Tom Matriq](https://www.youtube.com/user/TomMatriq).
