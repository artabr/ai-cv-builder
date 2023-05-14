# Project Title: AI-based Professional CV Generator

The AI-based CV Career Generator is a smart system that leverages cutting-edge AI technology to automate the creation of professional CVs. It takes in user inputs, processes them, and generates a tailored CV that aligns with the user's career history and aspirations.

## How It Works

1. **API Requests:** The system sends API requests to an AI source with specific response parameters to ensure the uniqueness of each CV.

2. **AI Career Advice:** The AI algorithms act as a professional cv generator, using the received data to generate personalized descriptions.

3. **Self-Description Generation:** Based on user inputs such as skills, previous job experience, employer's name, employment period, and job function, the system generates a personalized description for the user.

4. **Education Description Generation:** Based on university name and specialization, the system generates appropriate educational descriptions.

5. **CV Rendering:** Using the generated descriptions, the system renders a complete CV which can be downloaded or submitted directly from the platform.

6. **UI Adjustments:** Users have the ability to make further adjustments to the AI-generated descriptions through the user interface. They also have the option to choose a different CV template.

7. **Context Consideration:** The system remembers the user's previous context to generate accurate and personalized adjustments for the CV.

## Getting Started
[![Node version](https://img.shields.io/badge/node-18.12.1-brightgreen)]()
[![NPM Version](https://img.shields.io/badge/npm-8.19.2-blue)]()

### 1. Requirements

- nodejs (18.12.1+)
- npm (8.19.2+)

> Note: if you need to change node version, use [nvm (link)](https://github.com/nvm-sh/nvm)

### 2. Install dependencies

Run
```sh
npm ci
```

## Build project

```sh
npm run build
```

## Run prod server

```sh
npm start
```

## Run dev server

```sh
npm run dev
```

## Run linter

```sh
npm run lint
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

Artem Abramov (Software Engineer) - [artem_abramov1@epam.com]

Viktor Kyssa (Software Engineer) - [viktor_kyssa@epam.com]

Yauheni Bykau (Software Engineer) - [yauheni_bykau@epam.com]

Ihor Protsiuk ( Senior Software Engineer) - [igor_protsiuk@epam.com]

Alisher Zhangbyrshy (Senior Software Engineer) - [alisher_zhangbyrshy@epam.com]

Ivan Cherepnin (Business Analyst) - [ivan_cherepnin@epam.com]

Project Link: [Project Repository](https://github.com/artabr/ai-cv-builder)

Project Deployed Here: [Project Repository](https://ai-cv-builder-production.up.railway.app/)

## Acknowledgements

Our system leverages the [OpenAI Node.js Library](https://www.npmjs.com/package/openai), specifically utilizing the _gpt-3.5-turbo_ model, to create dynamic and intelligent responses.

The user interface (UI) is designed with the aesthetic and functional [And Design](https://ant.design/) framework, ensuring a seamless and user-friendly experience.
