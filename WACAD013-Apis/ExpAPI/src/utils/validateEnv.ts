import {cleanEnv, port, str} from 'envalid';

const validateEnv = () => {
    return cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production', 'test']
        }),
        PORT: port(),
        SESSION_SECRET: str()
    });
};

export default validateEnv;