export const getDuration = (durationString = "") => {
  const duration = { hours: 0, minutes: 0, seconds: 0 };
  const durationParts = durationString
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .split(":");

  if (durationParts.length === 3) {
    duration["hours"] = durationParts[0];
    duration["minutes"] = durationParts[1];
    duration["seconds"] = durationParts[2];
  }

  if (durationParts.length === 2) {
    duration["minutes"] = durationParts[0];
    duration["seconds"] = durationParts[1];
  }

  if (durationParts.length === 1) {
    duration["seconds"] = durationParts[0];
  }

  return {
    ...duration,
    string: `${duration.hours.toString().padStart(2, "0")}:${duration.minutes
      .toString()
      .padStart(2, "0")}:${duration.seconds.toString().padStart(2, "0")}`,
  };
};

export const abbreviateNumber = (value: Number) => {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = null;
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};

export const calculateSol = (vid: any) => {
  console.log(vid.duration);
  return (
    vid.duration.seconds * 0.0001 +
    vid.duration.minutes * 0.001 +
    vid.duration.hours * 0.01
  );
};

export const timeToSecs = (time: string) => {
  var a = time.split(":"); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  return seconds;
};

export const round = (num: number, places: number) => {
  var multiplier = Math.pow(10, places);
  return Math.round(num * multiplier) / multiplier;
};
