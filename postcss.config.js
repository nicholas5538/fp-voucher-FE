export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: { grid: 'autoplace' },
    ...(process.env.NODE_ENV === 'production'
      ? { cssnano: { preset: ['default', { discardUnused: true }] } }
      : {}),
  },
};
