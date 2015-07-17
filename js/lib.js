function param_mb(mi, gsi, d){
  return(mi * Math.exp((gsi - 100)/(28 - 14*d)));
}

function param_s(gsi, d){
  return(Math.exp((gsi - 100) / (9 - 3*d)));
}

function param_a(gsi){
  return(1/2 + 1/6 * (Math.exp(-gsi/15) - Math.exp(-20/3)));
}

function HoekBrown(s3, sci, mi, gsi, d){
  var s = param_s(gsi, d);
  var a = param_a(gsi);
  var mb = param_mb(mi, gsi, d);

  return(s3 + sci * Math.pow((mb * s3 / sci + s), a));
}

function HBarray(s3Array, sci, mi, gsi, d){
  var hbArr = [];

  for (var i = 0, l = s3Array.length; i < l; i ++) {
    var s3 = s3Array[i];
    var s1 = HoekBrown(s3, sci, mi, gsi, d);

    if (!isNaN(s1)) {
      hbArr.push([s3, s1]);
    }

  }

  return(hbArr);
}
