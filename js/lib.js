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

function MohrCoulomb(s3, coh, phi){
  var second = (2 * coh * Math.cos(phi))/(1 - Math.sin(phi));
  var first = (1 + Math.sin(phi))/(1 - Math.sin(phi));
  return (first + second * s3);
}

function cohesion(sci, a, s, mb, s3n){
  var smbsa = Math.pow(s + mb * s3n, a - 1);
  var a2a = (1 + a) * (2 + a);
  var num = (sci * ((1 + 2 * a) * s + (1 - a)*mb*s3n)*(smbsa));
  var den = (a2a*Math.sqrt(1 + ((6 * a * mb * (smbsa)/(a2a)))));
  return num / den;
}

function friction(sci, a, s, mb, s3n){
  var potencia = Math.pow(s + mb * s3n, a - 1);
  var den = (2 * (1 + a) * (2 + a) + 6 * a * mb * potencia);
  var asin_param = ((6 * a * mb * (Math.pow(s + mb * s3n, a - 1))) / den);
  return (Math.asin(asin_param) * 180 / Math.PI);
}

function MCArray(s3Array, sci, mi, gsi, d, s3max){
  var hbArr = [];

  var s = param_s(gsi, d);
  var a = param_a(gsi);
  var mb = param_mb(mi, gsi, d);

  var s3n = s3max / sci;

  var coh = cohesion(sci, a, s, mb, s3n);
  var phi = friction(sci, a, s, mb, s3n);

  for (var i = 0, l = s3Array.length; i < l; i ++) {
    var s3 = s3Array[i];
    var s1 = MohrCoulomb(s3, coh, phi);

    if (!isNaN(s1) && s3 >= 0 ) {
      hbArr.push([s3, s1]);
    }

  }

  return(hbArr);
}
