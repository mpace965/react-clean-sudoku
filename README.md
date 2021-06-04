# React Clean Sudoku

An implementation of [sudoku](https://en.wikipedia.org/wiki/Sudoku) using the principles of [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Usage

This repo uses the [Create React App](https://create-react-app.dev/) [TypeScript template](https://create-react-app.dev/docs/adding-typescript/). To run locally, simply run `yarn install` and `yarn start`.

## Features

* Use arrow keys to navigate the sudoku grid
* Input guesses with number keys

### Planned Features

* Save game progress between page refreshes using the browser [local storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* Implement a user interface for selecting multiple in-progress games
* Implement a user interface for manually inputting a new sudoku puzzle
* Implement a data provider for importing a sudoku puzzle from an external source

## Project Structure

As previously mentioned, this repository is a [Create React App](https://create-react-app.dev/) project.

### Core

Currently, the separation of concerns recommended by Clean Architecture is achieved by writing business logic in the `src/core` directory. However, this directory could be an entirely separate package from the client React code. This would allow for independent deploys: if the top-level API exposed by the `src/core` package remains the same, then the underlying business logic can be changed without needing to modify frontend code at all.

#### Domain

`src/core/domain` represents the most general business rules of sudoku, and the innermost layer of Clean Architecture. No framework code (such as React) is present in this layer of the architecture. In Clean Architecture, the layers are most general in the center, and most specific on the outside. UI presentation is a detail. Data storage is a detail. The rules of sudoku are more general, and do not need to know about these details.

##### Entities

In `src/core/domain/entity`, entities are defined for fixed and open sudoku squares, as well as a sudoku entity that aggregates sudoku squares into the puzzle we're familiar with. Logic intrinsic to these entities such as validation and testing if the puzzle is solved is also contained here.

##### Usecases

Simply defining entities is not enough to support interaction. To this end, usecases are implemented. Currently, usecases depend on a simple `SudokuRepository` interface that allows it to read and write puzzles from a data store. Currently the only data store implemented uses JavaScript runtime memory (see planned features). The usecases depend on this interface rather than a concrete implementation of the repository. This allows for different implementations of the repository to be used without modifying the usecase.

##### Errors

Custom errors are defined to convey to clients that a business rule has been violated.

#### Data Providers

`src/core/data-provider` contains concrete implementations of repository interfaces defined by the usecases. In Clean Architecture, it is a layer above the domain, and so it can depend directly on the interfaces the usecases define.

#### Entrypoints

`src/core/entrypoint` provides an API for a client to interact with the business rules. It is the responsibility of the entrypoint to mediate between the business rules and the client. It interacts with the business rules, and converts entities into a format that is most convenient for the client to use. It also accepts inputs in a format that is most convenient for the client to provide. Entrypoints depend on usecase interfaces to use the behavior they define. Entrypoints are at the same layer of the architecture as data providers, but are a separate module and should not directly depend on data providers.

Currently, there is just one entrypoint defined: `src/core/entrypoint/react`. Here, React hooks that depend on the usecase interfaces are defined. The hooks convert the sudoku entities into a format that is most convenient for the client React code to use.

The beauty of Clean Architecture is that we can define multiple entrypoints to leverage the same business rules. For example, `src/core/entrypoint/cli` could create entrypoints for making a command line client for sudoku. `src/core/entrypoint/rest` could implement REST endpoints on a backend server. Referring back to the idea of making `src/core` a package, this could suggest the following package structure:

* `@sudoku-game/core`: Contains the domain entities, usecases (and external interfaces they define), and errors.
* `@sudoku-game/react`: Depends on `@sudoku-game/core` to define data providers and entrypoints specific to React clients. Exposes a library of hooks for React clients to use.
* `@sudoku-game/cli`: Depends on `@sudoku-game/core` to define data providers and entrypoints specific to command line clients. Exposes a library for a CLI program to use.
* `@sudoku-game/rest`: Depends on `@sudoku-game/core` to define data providers and entrypoints specific to a web server/database. Exposes a library for the web server to use.

#### Configuration

`src/core/configuration` wires together the usecases and data providers using [Inversify](https://inversify.io/). The usecases depend on interfaces, and therefore cannot (and should not) directly instantiate a concrete implementation of that interface to use. This presents a problem, as the usecase needs a concrete implementation at runtime to perform the task at hand. Inversify solves this problem using [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control), and exposes a container with all interface dependencies resolved for clients to use. Clients can also modify the container to suit their usage. For example, if there are multiple data providers that implement the same repository interface, a client could rewire the container to resolve a different data provider when one is requested. The configuration layer is above the data provider/entrypoint layer.

#### Library

`src/core/lib` is a layer on top of the configuration layer that exports a simplified version of the React hooks defined in `src/core/entrypoint/react`. The hooks defined in the entrypoint layer have dependencies on the usecase interfaces. However, clients should not have to worry about supplying a usecase to the hook. The library layer uses the container exposed by the configuration layer to resolve the usecase dependency, and export a simplified version of the hook that only depends on client input.

Resolving these dependencies is something that could feasibly done at the configuration layer, but at the time of writing, I could not figure out a clean way to resolve function argument dependencies using Inversify. Even if the dependency resolution were done at the configuration layer, the library layer would still need to exist to export these functions from the container so that the client need not interact directly with it.

### Components and Hooks 

The client React code primarily lives in the `src/components` and `src/hooks` directory. There are a couple of exceptions to this rule:

1. `src/index.tsx` - the Create React App entrypoint
2. `src/core/entrypoint/react` - these hooks provide an entrypoint to the client React code, and interact with business logic. The client React code does not need to know anything about the business rules to use these entrypoints.

The client React code only ever depends on top-level exports from the `src/core` directory.
