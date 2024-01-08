const getRoom = (req, res, next) => {
  try {
    res.status(200).json({ message: "Get response from /api/room" });
  } catch (error) {
    console.log(error);
  }
};

export { getRoom };
