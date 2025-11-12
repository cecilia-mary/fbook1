module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      backgroundImage: {
        "center-blur-line":
          "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0) 100%)",
      }
    },
  },
  plugins: [],
};
