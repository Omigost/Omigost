import * as path from "path";

export default (pathComponents) => {
    return {
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', 'index.ts', 'index.tsx', 'index.js', 'index.jsx'],
            alias: {
                'scss': path.join.apply(this, [...pathComponents, 'src', 'scss']),
                'components': path.join.apply(this, [...pathComponents, 'src', 'components', 'universal']),
                'pages': path.join.apply(this, [...pathComponents, 'src', 'components', 'pages']),
                'langs': path.join.apply(this, [...pathComponents, 'src', 'langs']),
                'routes': path.join.apply(this, [...pathComponents, 'src', 'routes']),
                'themes': path.join.apply(this, [...pathComponents, 'src', 'themes']),
                'modules': path.join.apply(this, [...pathComponents, 'src', 'modules']),
                'img': path.join.apply(this, [...pathComponents, 'src', 'assets', 'img']),
                'client': path.join.apply(this, [...pathComponents, 'src', 'client']),
            },
        },
        context: path.join.apply(this, [...pathComponents, 'src']),
    };
};