mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // Lancer le serveur uniquement après la connexion
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Test route to verify MongoDB connection
app.get('/dbcheck', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ mongo: isConnected });
});

