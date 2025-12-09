class ResponseHandler {
  static create(res, message, data) {
    return res.status(201).json({ message, data });
  }

  static ok(res, message, data) {
    return res.status(200).json({ message, data });
  }

  static auth(res, message, data) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
      expires: new Date(Date.now() + 60 * 60 * 1000),
    };

    if (Object.keys(data).length > 1) {
      return res
        .status(200)
        .cookie("authToken", data.accessToken, cookieOptions)
        .json({ message, refreshToken: data?.refreshToken });
    } else {
      return res
        .status(200)
        .cookie("authToken", data.accessToken, cookieOptions)
        .json({ message });
    }
  }

  static logout(res, message) {
    return res.status(200).clearCookie("authToken").json({ message });
  }
}

module.exports = ResponseHandler;
