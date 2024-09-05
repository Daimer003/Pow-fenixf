function showToast(_0x3acca3) {
    var _0x42efc0 = document.getElementById("toast");
    var _0x27ed10 = document.getElementById("noDataMessage");
    var _0x135422 = _0x27ed10.getBoundingClientRect();
    _0x42efc0.style.left = _0x135422.left + 'px';
    _0x42efc0.style.bottom = window.innerHeight - _0x135422.top + 'px';
    _0x42efc0.className = "toast show";
    _0x42efc0.innerText = _0x3acca3;
    setTimeout(function () {
      _0x42efc0.className = _0x42efc0.className.replace("show", '');
    }, 0x1f40);
  }
  var invalidCounter = 0x0;
  var invalidThreshold = 0x2;
  var optname = 0x0;
  function updateErrorMessage() {
    const _0x1251fe = [];
    const _0x45fd63 = new Date();
    const _0x542d63 = _0x45fd63.getFullYear();
    const _0x26e18f = String(_0x45fd63.getMonth() + 0x1).padStart(0x2, '0');
    const _0x4da9e7 = String(_0x45fd63.getDate()).padStart(0x2, '0');
    const _0x637e48 = _0x542d63 + '-' + _0x26e18f + '-' + _0x4da9e7;
    const _0x27ad6f = document.getElementById("forward").value;
    const _0x25d388 = document.getElementById('start').value;
    const _0x51a99a = document.getElementById('end').value;
    if (!_0x27ad6f || new Date(_0x27ad6f) <= new Date(_0x25d388) || new Date(_0x27ad6f) >= new Date(_0x51a99a) || !_0x51a99a || !_0x25d388 || new Date(_0x25d388) >= new Date(_0x27ad6f)) {
      _0x1251fe.push("<i class=\"fas fa-times-circle\"></i> Forward date must be between Start date and End date - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a><br>");
    } else if (new Date(_0x51a99a) > new Date(_0x637e48) || new Date(_0x25d388) > new Date(_0x637e48) || new Date(_0x27ad6f) > new Date(_0x637e48)) {
      _0x1251fe.push("<i class=\"fas fa-times-circle\"></i> All dates must be earlier than today's date<br>");
    } else {
      _0x1251fe.push("<i class=\"fas fa-check-circle\"></i> No Settings errors - click UPLOAD to push data into the SetFinder table<br>");
    }
    for (let _0x4da778 in prefixGroups) {
      if (!prefixGroups[_0x4da778].back) {
        _0x1251fe.push("<i class=\"fas fa-times-circle\"></i> No Back file found for '" + _0x4da778 + "' - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a><br>");
      }
      if (!prefixGroups[_0x4da778].forward) {
        _0x1251fe.push("<i class=\"fas fa-times-circle\"></i> No Forward file found for '" + _0x4da778 + "' - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a><br>");
      }
    }
    if (invalidCounter >= 0x2) {
      _0x1251fe.push("<i class=\"fas fa-exclamation-triangle\"></i> " + optname + "  has " + invalidCounter + " missing Pass numbers - try re-exporting (you can still upload the rest of the data by clicking UPLOAD) - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a><br>");
    }
    const _0x2fcc83 = document.getElementById("noDataMessage");
    _0x2fcc83.innerHTML = _0x1251fe.join('');
    if (_0x1251fe.length > 0x0) {
      $("#noDataMessage").show();
    }
  }
  document.getElementById('files').addEventListener("change", function () {
    var _0x3cd253 = this.files;
    for (var _0x2a1a9c = 0x0; _0x2a1a9c < _0x3cd253.length; _0x2a1a9c++) {
      var _0x3214b6 = _0x3cd253[_0x2a1a9c];
      var _0x1f3dd2 = _0x3214b6.name.split('.').pop().toLowerCase();
      if (_0x1f3dd2 !== "xml") {
        alert("Invalid file type. Please only upload .xml files.");
        this.value = '';
        return;
      }
    }
  });
  var isUploadClicked = false;
  window.uploadedFiles = [];
  document.getElementById("files").addEventListener('change', function (_0x4a65ef) {
    document.body.style.cursor = 'wait';
    window.uploadedFiles = Array.from(_0x4a65ef.target.files);
    document.body.style.cursor = "default";
  });
  function parseXml(_0x36dff6) {
    var _0x2cb3eb = new DOMParser();
    return _0x2cb3eb.parseFromString(_0x36dff6, 'application/xml');
  }
  function extractData(_0xcf0afb, _0x2df1da, _0x503bee, _0x190eb7) {
    var _0x4bc023 = [];
    var _0x4bb6bf = _0xcf0afb.getElementsByTagName("Row");
    var _0x2423b1 = Array.from(_0x4bb6bf[0x0].getElementsByTagName('Cell')).map(_0x542e44 => _0x542e44.textContent);
    var _0x258eed = _0x2df1da.map(_0x259496 => _0x2423b1.indexOf(_0x259496));
    invalidCounter = 0x0;
    for (var _0x4ed203 = 0x1; _0x4ed203 < _0x4bb6bf.length; _0x4ed203++) {
      var _0x22ed21 = _0x4bb6bf[_0x4ed203];
      var _0x56e380 = {
        "Optimisation Name": _0x190eb7
      };
      optname = _0x190eb7;
      for (var _0x1642a7 = 0x0; _0x1642a7 < _0x258eed.length; _0x1642a7++) {
        var _0x448fad = _0x2df1da[_0x1642a7];
        _0x56e380[_0x503bee + " " + _0x448fad] = '';
        var _0x5349ed = _0x22ed21.getElementsByTagName("Cell")[_0x258eed[_0x1642a7]];
        if (_0x5349ed) {
          var _0x185895 = _0x5349ed.getElementsByTagName("Data")[0x0];
          if (_0x185895) {
            _0x185895 = _0x185895.textContent;
            if (_0x448fad === "Pass") {
              var _0x3c349f = parseFloat(_0x185895);
              if (isNaN(_0x3c349f) || _0x3c349f < 0x1) {
                invalidCounter++;
              }
              _0x185895 = _0x190eb7 + '_' + _0x185895;
            }
          } else {
            continue;
          }
          _0x56e380[_0x503bee + " " + _0x448fad] = _0x185895;
        }
      }
      _0x4bc023.push(_0x56e380);
    }
    if (invalidCounter >= 0x2) {
      $("#noDataMessage").show();
      document.getElementById('noDataMessage').innerHTML += "<i class=\"fas fa-exclamation-triangle\"></i> " + _0x190eb7 + " has " + invalidCounter + " missing Pass numbers - try re-exporting from MT5 (you can still upload the rest of the data by cicking UPLOAD) - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a><br>";
    }
    return _0x4bc023;
  }
  var backFileColumns = ["Pass", 'Result', "Profit", "Recovery Factor", "Equity DD %", "Trades"];
  var forwardFileColumns = ["Pass", "Forward Result", "Back Result", "Profit", "Recovery Factor", "Equity DD %", "Trades"];
  var backFileData = [];
  var forwardFileData = [];
  function calculateCustomScore(_0xf42894, _0x412ba8, _0x5f21d0, _0x4afdd9) {
    const _0x53b842 = parseFloat(_0xf42894["Back Profit"]);
    const _0x531e04 = parseFloat(_0xf42894["Forward Profit"]);
    const _0x2ed84f = parseFloat(_0xf42894["Back Recovery Factor"]);
    const _0x3cc5ba = parseFloat(_0xf42894["Forward Recovery Factor"]);
    const _0x315d46 = parseInt(_0xf42894["Back Trades"]);
    const _0x2b8e69 = parseInt(_0xf42894["Forward Trades"]);
    const _0x16eb43 = (_0x53b842 + _0x531e04).toFixed(0x2);
    const _0x4a2262 = Math.max(_0x53b842 / _0x2ed84f, _0x531e04 / _0x3cc5ba).toFixed(0x2);
    const _0x2e659a = _0x16eb43 / _0x4a2262;
    const _0x2b938c = _0x53b842 / _0x2ed84f;
    const _0xde9aec = _0x531e04 / _0x3cc5ba;
    const _0x3eda3e = _0x5f21d0 / 86400000;
    const _0x551afc = _0x412ba8 / 86400000;
    const _0x43cc9a = 0x64 * (Math.log(_0x2e659a) / Math.log(0x4));
    if (_0x2ed84f <= 0x1 && _0x3cc5ba <= 0x1 || _0x315d46 + _0x2b8e69 < (_0x3eda3e - _0x551afc) / 0x5) {
      return 0x0;
    }
    const _0x72ef29 = (_0x4afdd9 - _0x412ba8) / (_0x5f21d0 - _0x4afdd9);
    const _0x43dfec = 0x64 * (0x1 - Math.abs(0x1 - _0x531e04 / (_0x53b842 / _0x72ef29)));
    const _0xe28cfa = 0x64 * (0x1 - Math.abs(0x1 - _0x2b8e69 / (_0x315d46 / _0x72ef29)));
    const _0x4f45eb = 0x64 * (0x1 - Math.abs((_0xde9aec - _0x2b938c) / (_0xde9aec + _0x2b938c)));
    const _0x1313a1 = _0x43dfec * 0.25 + _0x43cc9a * 0.5 + _0x4f45eb * 0.15 + _0xe28cfa * 0.1;
    return _0x1313a1;
  }
  function updateTable() {
    document.body.style.cursor = "wait";
    document.getElementById("loadingSpinner").style.display = "block";
    var _0x143e06 = new Date(document.getElementById("start").value);
    var _0xe0132c = new Date(document.getElementById('end').value);
    var _0x25d988 = new Date(document.getElementById('forward').value);
    var _0x4298d9 = Number(document.getElementById("profitMatchLower").value);
    var _0xb61188 = Number(document.getElementById("profitMatchUpper").value);
    var _0x292d31 = Number(document.getElementById('backRecoveryFactor').value);
    var _0x42226b = Number(document.getElementById("forwardRecoveryFactor").value);
    var _0x13cd79 = Number(document.getElementById("backResult").value);
    var _0x571a03 = Number(document.getElementById("forwardResult").value);
    var _0x1e8f73 = Number(document.getElementById('targetDD').value);
    var _0xa23262 = backFileData.map(_0xbdb22 => {
      var _0xd225be = _0xbdb22["Optimisation Name"];
      var _0x3f3c0d = forwardFileData.find(_0x185fe3 => _0x185fe3["Forward Pass"] === _0xbdb22["Back Pass"]);
      if (!_0x3f3c0d) {
        return null;
      }
      var _0x5659c4 = Object.assign({}, _0xbdb22, _0x3f3c0d);
      _0x5659c4["Back Pass"] = _0x5659c4["Back Pass"].replace(_0xd225be + '_', '');
      _0x5659c4["Forward Pass"] = _0x5659c4["Forward Pass"].replace(_0xd225be + '_', '');
      var _0x81142a = Number(_0xbdb22["Back Profit"]);
      var _0x519e77 = Number(_0x3f3c0d["Forward Profit"]);
      var _0x1eff66 = (_0x25d988 - _0x143e06) / (_0xe0132c - _0x25d988);
      _0x5659c4["ProfitMatch%"] = (_0x519e77 / (_0x81142a / _0x1eff66) * 0x64).toFixed(0x2);
      return _0x5659c4;
    }).filter(_0x29fdeb => _0x29fdeb !== null);
    _0xa23262.forEach(_0x2ea006 => {});
    _0xa23262 = _0xa23262.map(_0x1fb54d => {
      var _0x2392f4 = Number(_0x1fb54d["Back Profit"]);
      var _0x390a7c = Number(_0x1fb54d["Forward Profit"]);
      var _0x47f4a8 = _0x1e8f73 / Math.max(_0x2392f4 / _0x1fb54d["Back Recovery Factor"], _0x390a7c / _0x1fb54d["Forward Recovery Factor"]);
      _0x1fb54d["Total Original Profit"] = (_0x2392f4 + _0x390a7c).toFixed(0x2);
      _0x1fb54d["Max Original DD"] = Math.max(_0x2392f4 / _0x1fb54d["Back Recovery Factor"], _0x390a7c / _0x1fb54d["Forward Recovery Factor"]).toFixed(0x2);
      var _0x231eef = _0x1fb54d["Total Original Profit"] / _0x1fb54d["Max Original DD"];
      _0x1fb54d["Lot Multiplier_"] = _0x47f4a8;
      _0x1fb54d["Lot Multiplier"] = Number(_0x47f4a8.toFixed(0x2));
      _0x1fb54d["Total Estimated Profit"] = ((_0x2392f4 + _0x390a7c) * _0x47f4a8).toFixed(0x2);
      _0x1fb54d["Max Estimated DD"] = (_0x1fb54d["Total Estimated Profit"] / _0x231eef).toFixed(0x2);
      const _0x23b03f = calculateCustomScore(_0x1fb54d, _0x143e06, _0xe0132c, _0x25d988);
      if (_0x23b03f !== null) {
        _0x1fb54d["POW Score"] = _0x23b03f.toFixed(0x2);
      }
      return _0x1fb54d;
    });
    _0xa23262 = _0xa23262.filter(_0x1d6641 => {
      return parseFloat(_0x1d6641["ProfitMatch%"]) >= _0x4298d9 && parseFloat(_0x1d6641['ProfitMatch%']) <= _0xb61188 && parseFloat(_0x1d6641["Back Recovery Factor"]) >= _0x292d31 && parseFloat(_0x1d6641["Forward Recovery Factor"]) >= _0x42226b && parseFloat(_0x1d6641["Forward Back Result"]) >= _0x13cd79 && parseFloat(_0x1d6641["Forward Forward Result"]) >= _0x571a03;
    });
    if (_0xa23262.length > 0x0) {
      $("#myTable").show();
      $("#resultsTable").show();
      var _0x27b0c0 = Object.keys(_0xa23262[0x0]).map(_0x56e584 => ({
        'data': _0x56e584,
        'title': _0x56e584
      }));
      _0x27b0c0.unshift({
        'data': null,
        'title': "Hide"
      });
      if ($.fn.DataTable.isDataTable('#myTable')) {
        $("#myTable").DataTable().destroy();
      }
      $("#myTable").empty();
      var _0x202a44 = ["Forward Pass", "Forward Back Result", "Lot Multiplier_"];
      var _0x26da74 = _0x27b0c0.findIndex(_0x4cb9e2 => _0x4cb9e2.title === "POW Score");
      var _0x1f1408 = $("#myTable").DataTable({
        'select': {
          'style': "multi",
          'selector': "td:not(.hide-column)"
        },
        'data': _0xa23262,
        'columns': _0x27b0c0.concat([{
          'title': 'GraphData'
        }, {
          'title': "Include in DD analysis"
        }]).map(_0x499d18 => {
          return {
            'data': _0x499d18.data,
            'title': _0x499d18.title,
            'visible': !_0x202a44.includes(_0x499d18.title),
            'render': function (_0x3f244d, _0x4b81a6, _0x83e41b) {
              if (_0x499d18.title === "Hide") {
                return "<td class=\"hide-column\"><i class=\"fa fa-eye-slash hide-icon\" style=\"cursor: pointer;\"></i>";
              }
              if (_0x499d18.title === 'GraphData') {
                return "<input type=\"file\" class=\"csvbutton\" accept=\".csv\" />";
              }
              if (_0x499d18.title === "Include in DD analysis") {
                return "<input type=\"checkbox\" class=\"include-checkbox\" />";
              }
              return _0x3f244d;
            }
          };
        }),
        'order': [[_0x26da74, "desc"]],
        'columnDefs': [{
          'orderSequence': ["desc", "asc"],
          'targets': "_all"
        }],
        'destroy': true
      });
      var _0x35b4be = localStorage.getItem("dataTables_length");
      if (_0x35b4be !== null) {
        _0x1f1408.page.len(Number(_0x35b4be)).draw();
      }
      _0x1f1408.on("length.dt", function (_0x5b9c47, _0x1c6db3, _0x29cb44) {
        localStorage.setItem("dataTables_length", _0x29cb44);
      });
      _0x1f1408.on("user-select", function (_0x359fd2, _0x2c3fd5, _0x2c6668, _0x4b5af2, _0x3c6a9f) {
        if ($(_0x3c6a9f.target).hasClass("hide-icon")) {
          _0x359fd2.preventDefault();
        }
      });
      $("body").on("click", '.hide-icon', function (_0x30b2d5) {
        _0x30b2d5.preventDefault();
        _0x30b2d5.stopPropagation();
        clearTable();
        var _0x13f536 = $("#myTable").DataTable().row($(this).parents('tr')).data();
        var _0x7ee522 = analysisData.findIndex(_0x4f3d74 => _0x4f3d74["Back Pass"] === _0x13f536["Back Pass"] && _0x4f3d74["Optimisation Name"] === _0x13f536["Optimisation Name"]);
        if (_0x7ee522 > -0x1) {
          analysisData.splice(_0x7ee522, 0x1);
        }
        $(this).parents('tr').find(".include-checkbox").prop("checked", false);
        $(this).parents('tr').addClass("hidden-row");
        addDDAnalysisButton();
      });
      $("#myTable_filter").append("<button id=\"showHiddenButton\" type=\"button\">Show Hidden</button>");
      $("#showHiddenButton").on('click', function () {
        $(".hidden-row").removeClass("hidden-row");
      });
      var _0x40bef1 = false;
      $("#myTable_filter").append("<button id=\"toggleButton\" type=\"button\">Show Selected</button>");
      $("#toggleButton").on("click", function () {
        _0x40bef1 = !_0x40bef1;
        if (_0x40bef1) {
          $(this).text("Show All");
          $.fn.dataTable.ext.search.push(function (_0x5b8d96, _0x16a4b5, _0x4680c7) {
            return $(_0x1f1408.row(_0x4680c7).node()).hasClass("selected");
          });
        } else {
          $(this).text("Show Selected");
          $.fn.dataTable.ext.search.pop();
        }
        _0x1f1408.draw();
      });
      $("#myTable_filter").append("<button id=\"remove-duplicates\" type=\"button\">Remove Duplicates</button>");
      $("#remove-duplicates").on("click", function () {
        var _0x40f237 = {};
        var _0x55db51 = [];
        _0x1f1408.rows().every(function (_0x88e03b, _0x2d994a, _0x3b9f0c) {
          var _0x7621c6 = this.data();
          var _0x7ce2e4 = _0x7621c6["Back Trades"] + '|' + _0x7621c6["Forward Trades"] + '|' + _0x7621c6["Back Profit"] + '|' + _0x7621c6["Forward Profit"];
          if (_0x40f237.hasOwnProperty(_0x7ce2e4)) {
            _0x55db51.push(_0x88e03b);
          } else {
            _0x40f237[_0x7ce2e4] = true;
          }
        });
        _0x1f1408.rows(_0x55db51).remove().draw();
      });
      _0x1f1408.on('draw', function () {
        _0x1f1408.rows().every(function () {
          var _0x1cbe2e = this.data();
          var _0x2dd9f2 = $(this.node()).find('.include-checkbox');
          if (!_0x1cbe2e.csvData) {
            _0x2dd9f2.hide();
          } else {
            _0x2dd9f2.show();
          }
        });
      });
      const _0x1375b7 = document.querySelectorAll(".include-checkbox");
      for (let _0x93542d of _0x1375b7) {
        _0x93542d.style.display = 'none';
      }
      $("body").on("change", '.csvbutton', function (_0x18f42b) {
        var _0x4dcf07 = _0x18f42b.target.files[0x0];
        var _0x30a473 = $(this);
        var _0x12aa6a = new FileReader();
        _0x12aa6a.onload = function (_0x455519) {
          var _0x93f290 = $("#myTable").DataTable().row(_0x30a473.closest('tr')).data();
          if (_0x93f290) {
            _0x93f290.csvData = _0x455519.target.result;
            var _0x2fdad2 = _0x1f1408.page.info().page;
            $("#myTable").DataTable().row(_0x30a473.closest('tr')).data(_0x93f290).draw(false);
            _0x1f1408.page(_0x2fdad2).draw(false);
            var _0x489284 = _0x93f290["Optimisation Name"] + '_' + _0x93f290["Back Pass"];
            csvDataMap[_0x489284] = _0x455519.target.result;
            var _0x3eb78c = _0x30a473.closest('tr').querySelector(".include-checkbox");
            if (_0x3eb78c) {
              _0x3eb78c.style.display = 'inline-block';
            }
          } else {
            console.error("Row data is undefined for row:", _0x30a473.closest('tr'));
          }
        };
        _0x12aa6a.readAsText(_0x4dcf07);
      });
      document.querySelector("#myTable").addEventListener("change", function (_0x533675) {
        if (_0x533675.target && _0x533675.target.matches(".csvbutton")) {
          if (_0x533675.target.files.length > 0x0) {
            var _0xa8e09a = _0x533675.target.parentElement;
            _0xa8e09a.classList.add("green");
          } else {}
        }
      });
      $("#myTable").on('click', "input[type=\"checkbox\"], input[type=\"file\"]", function (_0x4c2e69) {
        _0x4c2e69.stopPropagation();
      });
      $("body").on("change", ".include-checkbox", function () {
        clearTable();
        var _0x4a76f0 = $("#myTable").DataTable().row($(this).parents('tr')).data();
        if (this.checked) {
          var _0x53fc44 = analysisData.some(_0x469ce8 => _0x469ce8["Back Pass"] === _0x4a76f0["Back Pass"] && _0x469ce8["Optimisation Name"] === _0x4a76f0["Optimisation Name"]);
          if (!_0x53fc44) {
            analysisData.push(_0x4a76f0);
          }
        } else {
          var _0xd30e48 = analysisData.findIndex(_0x4166b8 => _0x4166b8["Back Pass"] === _0x4a76f0["Back Pass"] && _0x4166b8["Optimisation Name"] === _0x4a76f0["Optimisation Name"]);
          if (_0xd30e48 > -0x1) {
            analysisData.splice(_0xd30e48, 0x1);
          }
        }
        addDDAnalysisButton();
      });
      $("#myTable").on('draw.dt', function () {
        addDDAnalysisButton();
      });
    } else {
      $("#myTable").hide();
      $("#resultsTable").hide();
      $("#noDataMessage").show();
      if (isUploadClicked) {
        document.getElementById("noDataMessage").innerHTML += "<i class=\"fas fa-exclamation-triangle\"></i> No results passed the filter conditions - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a>";
      }
    }
    document.getElementById('myTable').dataTableInstance = _0x1f1408;
    document.getElementById('loadingSpinner').style.display = "none";
    document.body.style.cursor = "default";
    window.mergedData = _0xa23262;
  }
  $("#addPassNum").click(function () {
    var _0x25393e = document.getElementById('myTable').dataTableInstance;
    if (!_0x25393e) {
      console.error("dataTable is not initialized.");
      return;
    }
    var _0x40184f = [];
    var _0x244610 = _0x25393e.rows({
      'selected': true
    });
    _0x244610.every(function (_0x5f276f, _0x235636, _0x2e3990) {
      var _0x1d7d86 = this.data();
      _0x40184f.push(_0x1d7d86["Back Pass"]);
    });
    $("#filter").val(_0x40184f.join(", "));
    filterResults();
  });
  function clearData() {
    forwardFileData = [];
    backFileData = [];
    analysisData = [];
    mergedData = [];
  }
  var prefixGroups = {};
  function handleFileSelect(_0x4f4266) {
    clearData();
    clearTable();
    var _0x13f5ce = document.getElementById("loading");
    while (_0x13f5ce.firstChild) {
      _0x13f5ce.removeChild(_0x13f5ce.firstChild);
    }
    document.body.style.cursor = "wait";
    var _0x14f00a = document.createElement('progress');
    _0x14f00a.max = 0x64;
    _0x14f00a.value = 0x0;
    _0x14f00a.style.backgroundColor = "#00ff00";
    document.getElementById("loading").appendChild(_0x14f00a);
    var _0x33425a = _0x4f4266.target.files;
    var _0x22272f = [".forward", ".Forward", " Forward", " forward", ".fwd", '.Fwd', ".FORWARD", " FORWARD", " FWD", ".FWD", " fwd", " Fwd", "-fwd", "-Fwd", "-FWD", "-Forward", "-forward", "-FORWARD", '_fwd', '_Fwd', '_FWD', "_forward", "_Forward", "_FORWARD"];
    var _0x1ca695 = [];
    var _0x1b3499 = _0x33425a.length;
    var _0x13e583 = 0x0;
    var _0x4a60c0 = Array.from(_0x33425a).map(_0x25d9d5 => {
      return new Promise(_0x12721d => {
        var _0x214894 = new FileReader();
        _0x214894.onload = function (_0x1ab77b) {
          var _0x204071 = parseXml(_0x1ab77b.target.result);
          var _0x225768 = _0x25d9d5.name.split('.xml')[0x0];
          for (var _0x41a520 = 0x0; _0x41a520 < _0x22272f.length; _0x41a520++) {
            _0x225768 = _0x225768.split(_0x22272f[_0x41a520])[0x0];
          }
          var _0x3cf48f;
          if (_0x22272f.some(_0x41c655 => _0x25d9d5.name.endsWith(_0x41c655 + ".xml"))) {
            _0x3cf48f = extractData(_0x204071, forwardFileColumns, "Forward", _0x225768);
            forwardFileData = forwardFileData.concat(_0x3cf48f);
            _0x1ca695.push({
              'prefix': _0x225768,
              'type': "forward"
            });
          } else {
            _0x3cf48f = extractData(_0x204071, backFileColumns, 'Back', _0x225768);
            backFileData = backFileData.concat(_0x3cf48f);
            _0x1ca695.push({
              'prefix': _0x225768,
              'type': "back"
            });
          }
          _0x13e583++;
          var _0x561351 = _0x13e583 / _0x1b3499 * 0x64;
          _0x14f00a.value = _0x561351;
          _0x12721d();
        };
        _0x214894.readAsText(_0x25d9d5);
      });
    });
    Promise.all(_0x4a60c0).then(() => {
      prefixGroups = {};
      _0x1ca695.forEach(_0x4b7120 => {
        if (!prefixGroups[_0x4b7120.prefix]) {
          prefixGroups[_0x4b7120.prefix] = {
            'back': false,
            'forward': false
          };
        }
        prefixGroups[_0x4b7120.prefix][_0x4b7120.type] = true;
      });
      for (var _0x55967c in prefixGroups) {
        if (!prefixGroups[_0x55967c].back) {
          $("#noDataMessage").show();
          document.getElementById("noDataMessage").innerHTML += "<i class=\"fas fa-times-circle\"></i> No Back file found for '" + _0x55967c + "' - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a><br>";
        }
        if (!prefixGroups[_0x55967c].forward) {
          $('#noDataMessage').show();
          document.getElementById('noDataMessage').innerHTML += "<i class=\"fas fa-times-circle\"></i> No Forward file found for '" + _0x55967c + "' - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a><br>";
        }
      }
      _0x14f00a.style.display = "none";
      var _0x3b4e66 = document.createElement("span");
      _0x3b4e66.innerHTML = "Files selected!";
      updateErrorMessage();
      document.getElementById("loading").appendChild(_0x3b4e66);
      document.body.style.cursor = "default";
    });
  }
  function showLoadingBar() {
    document.body.style.cursor = "wait";
    var _0x23a621 = document.getElementById("loading");
    while (_0x23a621.firstChild) {
      _0x23a621.removeChild(_0x23a621.firstChild);
    }
    var _0x448b24 = document.createElement("progress");
    _0x448b24.max = 0x64;
    _0x448b24.value = 0x0;
    _0x448b24.style.backgroundColor = "#00ff00";
    _0x23a621.appendChild(_0x448b24);
    var _0x1f6c75 = setInterval(function () {
      _0x448b24.value += 0xa;
      if (_0x448b24.value >= 0x64) {
        clearInterval(_0x1f6c75);
        _0x448b24.style.display = "none";
        var _0x8fbb68 = document.createElement("span");
        _0x8fbb68.innerHTML = "Files selected!";
        _0x23a621.appendChild(_0x8fbb68);
      }
    }, 0x64);
    document.body.style.cursor = 'default';
  }
  function addDDAnalysisButton() {
    var _0x1a273d = $("#myTable").DataTable();
    var _0x16e63f = _0x1a273d.rows({
      'search': 'applied'
    }).nodes();
    var _0x1afbf2 = 0x0;
    for (var _0x9fabc4 = 0x0; _0x9fabc4 < _0x16e63f.length; _0x9fabc4++) {
      var _0x4f9d58 = $(_0x16e63f[_0x9fabc4]).find('td');
      var _0x3b2933 = $(_0x4f9d58[_0x4f9d58.length - 0x1]).find("input[type=\"checkbox\"]");
      if (_0x3b2933.prop("checked")) {
        _0x1afbf2++;
      }
    }
    var _0x7eafb2 = document.getElementById("analysis_button");
    if (_0x1afbf2 >= 0x1 && !_0x7eafb2) {
      _0x7eafb2 = document.createElement('button');
      _0x7eafb2.id = 'analysis_button';
      _0x7eafb2.className = 'buttonclass';
      _0x7eafb2.innerText = "Portfolio analysis";
      var _0x46caa1 = document.getElementById("buttonbox");
      _0x46caa1.appendChild(_0x7eafb2);
      document.getElementById("analysis_button").addEventListener('click', function () {
        event.preventDefault();
        document.getElementById('analysisOverlay').style.width = '90%';
        document.getElementById("blur-overlay").style.display = "block";
        performAnalysis();
        chart.update();
      });
    } else {
      if (_0x1afbf2 < 0x1 && _0x7eafb2) {
        _0x7eafb2.remove();
      }
    }
  }
  document.getElementById("soloDDanal").addEventListener("click", function () {
    event.preventDefault();
    document.getElementById("analysisOverlay2").style.width = "90%";
    document.getElementById("blur-overlay2").style.display = "block";
    chart_2.update();
  });
  document.addEventListener("click", function (_0x25481e) {
    var _0x1bf815 = document.getElementById('analysisOverlay2');
    var _0x539214 = document.getElementById("blur-overlay2");
    var _0x286080 = document.getElementById("soloDDanal");
    var _0x5adf08 = _0x1bf815.contains(_0x25481e.target);
    var _0x8a2ae5 = _0x25481e.target === _0x286080;
    if (!_0x5adf08 && !_0x8a2ae5) {
      _0x1bf815.style.width = '0%';
      _0x539214.style.display = "none";
      chart_2.update();
    }
  });
  document.addEventListener("click", function (_0x6708b) {
    var _0x3e4bdc = document.getElementById('analysisOverlay');
    var _0x44efc9 = document.getElementById("blur-overlay");
    var _0x25fa1a = document.getElementById('analysis_button');
    var _0x43d44f = _0x3e4bdc.contains(_0x6708b.target);
    var _0x215c98 = _0x6708b.target === _0x25fa1a;
    var _0x495b91 = document.getElementById("showgraph");
    var _0x4710fc = document.getElementById("graph");
    if (!_0x43d44f && !_0x215c98) {
      _0x3e4bdc.style.width = '0%';
      _0x44efc9.style.display = "none";
      _0x4710fc.classList.remove("show");
      _0x495b91.innerHTML = "SHOW GRAPH";
      chart.resetZoom();
      chart.options.scales.yAxes[0x0].ticks.min = minY;
      chart.options.scales.yAxes[0x0].ticks.max = maxY;
      chart.options.scales.xAxes[0x0].ticks.min = initialMinX;
      chart.options.scales.xAxes[0x0].ticks.max = initialMaxX;
      chart.update();
    }
  });
  var csvDataMap = {};
  $("body").on("change", ".csvbutton", function (_0x5a9a0f) {
    var _0x520561 = _0x5a9a0f.target.files[0x0];
    var _0x2daee9 = new FileReader();
    _0x2daee9.onload = function () {
      return function (_0xaa41ff) {
        var _0x486f89 = $("#myTable").DataTable().row($(this).parents('tr')).data();
        if (_0x486f89 && "Back Pass" in _0x486f89 && "Optimisation Name" in _0x486f89) {
          var _0x4e7719 = _0x486f89["Optimisation Name"] + '_' + _0x486f89["Back Pass"];
          csvDataMap[_0x4e7719] = _0xaa41ff.target.result;
        } else {
          console.error("Row data is not defined or does not have required properties");
        }
      };
    }(_0x520561);
    _0x2daee9.readAsText(_0x520561);
  });
  document.getElementById("files").addEventListener('change', function () {
    document.body.style.cursor = 'wait';
    isUploadClicked = false;
    invalidCounter = 0x0;
    updateTable();
    document.getElementById("noDataMessage").innerHTML = '';
    updateErrorMessage();
    document.body.style.cursor = "default";
  }, false);
  document.getElementById("files").addEventListener("change", function (_0x4fab54) {
    handleFileSelect(_0x4fab54);
  }, false);
  let isTableUploaded = false;
  document.getElementById("files").addEventListener('change', updateTable, false);
  document.getElementById("upload").addEventListener('click', () => {
    document.body.style.cursor = "wait";
    document.getElementById("loadingSpinner").style.display = "block";
    isUploadClicked = true;
    isTableUploaded = true;
    if (mergedData.length = 0x0) {
      document.getElementById("noDataMessage").innerHTML = "<i class=\"fas fa-exclamation-triangle\"></i> No results passed the filter conditions - see <a href=\"https://myaccount-pow.com/portfolio-guide#errors\" target=\"_blank\" style=\"cursor:pointer;color:white;text-decoration:underline;\"> Help Guide section 6 <i class=\"fas fa-external-link-alt\"></i></a>";
      $('myTable').hide();
    } else {
      $('myTable').show();
      updateIfUploaded();
      var _0x58241a = document.getElementById('loading');
      while (_0x58241a.firstChild) {
        _0x58241a.removeChild(_0x58241a.firstChild);
      }
    }
    document.getElementById("loadingSpinner").style.display = "none";
    document.body.style.cursor = "default";
  }, false);
  document.getElementById("profitMatchLower").addEventListener("change", updateIfUploaded, false);
  document.getElementById("profitMatchUpper").addEventListener("change", updateIfUploaded, false);
  document.getElementById('backRecoveryFactor').addEventListener("change", updateIfUploaded, false);
  document.getElementById('forwardRecoveryFactor').addEventListener("change", updateIfUploaded, false);
  document.getElementById("backResult").addEventListener("change", updateIfUploaded, false);
  document.getElementById("forwardResult").addEventListener("change", updateIfUploaded, false);
  function updateIfUploaded() {
    if (isTableUploaded) {
      updateErrorMessage();
      updateTable();
    }
  }
  document.querySelector("#files").addEventListener('change', function () {
    document.body.style.cursor = "wait";
    if (this.files.length > 0x0) {
      Array.from(this.files).forEach(function (_0x2b16fd, _0x165927, _0x181432) {
        var _0x1bd097 = new FileReader();
        _0x1bd097.onload = function (_0x2060a3) {
          var _0x1d582a = new DOMParser();
          var _0x5cfb85 = _0x1d582a.parseFromString(_0x2060a3.target.result, "text/xml");
          var _0x5901a7 = _0x5cfb85.getElementsByTagName("Title")[0x0].textContent;
          var _0x4a8b92 = _0x5901a7.match(/\b\d{4}\.\d{2}\.\d{2}\b/g);
          if (_0x4a8b92 && _0x4a8b92.length >= 0x2) {
            document.getElementById("start").value = _0x4a8b92[0x0].replace(/\./g, '-');
            document.getElementById('end').value = _0x4a8b92[0x1].replace(/\./g, '-');
          }
          if (_0x181432.length - 0x1 === _0x165927) {
            document.body.style.cursor = "default";
          }
        };
        _0x1bd097.readAsText(_0x2b16fd);
      });
    } else {
      document.body.style.cursor = "default";
    }
  });
  document.getElementById("forward").addEventListener("change", updateErrorMessage, false);
  document.getElementById("start").addEventListener("change", updateErrorMessage, false);
  document.getElementById("end").addEventListener("change", updateErrorMessage, false);
  function parseDate(_0x10102c) {
    if (_0x10102c) {
      const _0x204f6e = _0x10102c.replace(/\./g, '-').replace(" ", 'T') + 'Z';
      return new Date(_0x204f6e);
    } else {
      return null;
    }
  }
  function clearTable() {
    var _0xa7c771 = document.getElementById('results_table');
    for (var _0x18cee4 = _0xa7c771.rows.length - 0x1; _0x18cee4 >= 0x0; _0x18cee4--) {
      _0xa7c771.deleteRow(_0x18cee4);
    }
    globalEPcount = 0x0;
    lastGroupNumber = -0x1;
  }
  var dropTimes = [];
  function performAnalysis() {
    clearTable();
    addColumnNames();
    var _0x367d09 = document.getElementById("drop_threshold").value;
    var _0x183150 = document.getElementById("time_distance").value * 0x3c * 0x3e8;
    var _0x50fac5 = document.getElementById('measure_type').value;
    dropTimes = [];
    var _0x3ce3f0 = analysisData.map(_0x190711 => {
      return new Promise((_0x2dc03c, _0x3997d5) => {
        var _0x45666d = _0x190711["Optimisation Name"] + '_' + _0x190711["Back Pass"];
        var _0x1bcaf0 = _0x190711.csvData;
        var _0x371734 = Papa.parse(_0x1bcaf0, {
          'header': true
        }).data;
        analyzeFile(_0x371734, _0x367d09, _0x183150, _0x45666d, _0x50fac5);
        _0x2dc03c();
      });
    });
    Promise.all(_0x3ce3f0).then(() => {
      dropTimes.sort(function (_0x1ab591, _0x1d6541) {
        return _0x1ab591.date - _0x1d6541.date;
      });
      let _0x18aca3 = [];
      let _0x14e8fc = new Set();
      for (let _0x3a413d = 0x0; _0x3a413d < dropTimes.length; _0x3a413d++) {
        let _0x574153 = [dropTimes[_0x3a413d]];
        for (let _0x23e60 = _0x3a413d + 0x1; _0x23e60 < dropTimes.length; _0x23e60++) {
          if (dropTimes[_0x23e60].date - dropTimes[_0x3a413d].date <= _0x183150) {
            let _0x1bc8f3 = _0x574153.findIndex(_0x3f44a5 => _0x3f44a5.filename === dropTimes[_0x23e60].filename);
            if (_0x1bc8f3 !== -0x1 && dropTimes[_0x23e60].drop > _0x574153[_0x1bc8f3].drop) {
              _0x574153.splice(_0x1bc8f3, 0x1, dropTimes[_0x23e60]);
            } else if (_0x1bc8f3 === -0x1) {
              _0x574153.push(dropTimes[_0x23e60]);
            }
          } else {
            break;
          }
        }
        let _0xbbc28c = _0x574153.map(_0x407c7f => _0x407c7f.filename + _0x407c7f.date).sort().join(',');
        if (!_0x14e8fc.has(_0xbbc28c) && !(_0x574153.length === 0x1 && _0x18aca3.some(_0x20d790 => _0x20d790.some(_0xd32801 => _0xd32801.filename === _0x574153[0x0].filename && _0xd32801.date === _0x574153[0x0].date)))) {
          _0x14e8fc.add(_0xbbc28c);
          _0x18aca3.push(_0x574153);
        }
      }
      var _0xc2301d = 0x0;
      var _0x45b6a2 = 0x1;
      for (let _0x2c84a3 of _0x18aca3) {
        _0x2c84a3.sort(function (_0x305561, _0x2b324b) {
          return _0x305561.date - _0x2b324b.date;
        });
        var _0xeb1236 = _0x2c84a3.reduce((_0x26f817, _0x347908) => _0x26f817 + _0x347908.drop, 0x0);
        if (_0xeb1236 > _0xc2301d) {
          _0xc2301d = _0xeb1236;
        }
        if (_0xeb1236 >= _0x367d09) {
          for (let _0x3a4ce9 of _0x2c84a3) {
            addToTable(_0x3a4ce9.date, _0x3a4ce9.filename, _0x3a4ce9.drop, _0x45b6a2, _0xeb1236);
          }
          _0x45b6a2++;
        }
      }
      document.getElementById("maxGroupSum").textContent = "Maximum Group Global DD: " + _0xc2301d.toFixed(0x2);
      sortTable();
      chart.update();
      let _0x3f9771 = {};
      let _0x5dc84e = {};
      for (let _0x49f1dd = 0x0; _0x49f1dd < analysisData.length; _0x49f1dd++) {
        const _0x22006c = analysisData[_0x49f1dd];
        const _0x556cba = _0x22006c["Optimisation Name"] + '_' + _0x22006c["Back Pass"];
        const _0x1f5c08 = Papa.parse(csvDataMap[_0x556cba], {
          'header': true
        }).data;
        let _0x1cc33d = null;
        for (let _0x335308 of _0x1f5c08) {
          const _0x43e8e9 = moment(_0x335308["<DATE>"], "YYYY.MM.DD HH:mm");
          const _0x326697 = _0x43e8e9.format('YYYY');
          const _0x1f8a30 = _0x43e8e9.format('MM');
          const _0x61a9bf = _0x43e8e9.format('DD');
          const _0xcaa392 = parseFloat(_0x335308["<BALANCE>"]);
          if (_0x1cc33d !== null) {
            const _0x4b34d8 = _0xcaa392 - _0x1cc33d;
            if (!_0x3f9771[_0x326697]) {
              _0x3f9771[_0x326697] = {};
            }
            if (!_0x3f9771[_0x326697][_0x1f8a30]) {
              _0x3f9771[_0x326697][_0x1f8a30] = {};
            }
            if (!_0x3f9771[_0x326697][_0x1f8a30][_0x61a9bf]) {
              _0x3f9771[_0x326697][_0x1f8a30][_0x61a9bf] = 0x0;
            }
            _0x3f9771[_0x326697][_0x1f8a30][_0x61a9bf] += _0x4b34d8;
            if (!_0x5dc84e[_0x556cba]) {
              _0x5dc84e[_0x556cba] = {};
            }
            if (!_0x5dc84e[_0x556cba][_0x326697]) {
              _0x5dc84e[_0x556cba][_0x326697] = {};
            }
            if (!_0x5dc84e[_0x556cba][_0x326697][_0x1f8a30]) {
              _0x5dc84e[_0x556cba][_0x326697][_0x1f8a30] = {};
            }
            if (!_0x5dc84e[_0x556cba][_0x326697][_0x1f8a30][_0x61a9bf]) {
              _0x5dc84e[_0x556cba][_0x326697][_0x1f8a30][_0x61a9bf] = 0x0;
            }
            _0x5dc84e[_0x556cba][_0x326697][_0x1f8a30][_0x61a9bf] += _0x4b34d8;
          }
          _0x1cc33d = _0xcaa392;
        }
      }
      let _0x41c4f0 = "<table id=\"profitTable\"><thead><tr><th>Year / Month</th>";
      for (let _0x4610d6 = 0x1; _0x4610d6 <= 0xc; _0x4610d6++) {
        _0x41c4f0 += '<th>' + _0x4610d6 + "</th>";
      }
      _0x41c4f0 += "<th>Total</th></tr></thead><tbody>";
      _0x41c4f0 += "</tr></thead><tbody>";
      let _0x269d87 = Array(0xc).fill(0x0);
      for (let _0x2f7eb8 in _0x3f9771) {
        if (_0x2f7eb8 === "Invalid date") {
          continue;
        }
        let _0x325930 = 0x0;
        _0x41c4f0 += "<tr><th>" + _0x2f7eb8 + "</th>";
        for (let _0x28f21d = 0x1; _0x28f21d <= 0xc; _0x28f21d++) {
          let _0xbbadad = 0x0;
          let _0xdcf3bf = _0x28f21d.toString().padStart(0x2, '0');
          if (_0x3f9771[_0x2f7eb8][_0xdcf3bf]) {
            for (let _0x47e3fd in _0x3f9771[_0x2f7eb8][_0xdcf3bf]) {
              _0xbbadad += _0x3f9771[_0x2f7eb8][_0xdcf3bf][_0x47e3fd];
            }
          }
          _0x325930 += _0xbbadad;
          _0x269d87[_0x28f21d - 0x1] += _0xbbadad;
          let _0x41c325 = '';
          for (let _0x2ca256 in _0x5dc84e) {
            if (_0x5dc84e[_0x2ca256][_0x2f7eb8] && _0x5dc84e[_0x2ca256][_0x2f7eb8][_0xdcf3bf]) {
              let _0x3ff8e9 = 0x0;
              for (let _0x1b9d8e in _0x5dc84e[_0x2ca256][_0x2f7eb8][_0xdcf3bf]) {
                _0x3ff8e9 += _0x5dc84e[_0x2ca256][_0x2f7eb8][_0xdcf3bf][_0x1b9d8e];
              }
              _0x41c325 += _0x2ca256 + ": " + _0x3ff8e9.toFixed(0x2) + "\n";
            }
          }
          _0x41c4f0 += "<td title=\"" + _0x41c325 + "\">" + _0xbbadad.toFixed(0x2) + "</td>";
        }
        _0x41c4f0 += '<td>' + _0x325930.toFixed(0x2) + "</td></tr>";
      }
      _0x41c4f0 += "<tr><th>Total</th>";
      let _0x2aa6df = 0x0;
      for (let _0x26a682 = 0x0; _0x26a682 < 0xc; _0x26a682++) {
        _0x41c4f0 += '<td>' + _0x269d87[_0x26a682].toFixed(0x2) + "</td>";
        _0x2aa6df += _0x269d87[_0x26a682];
      }
      _0x41c4f0 += "<td>" + _0x2aa6df.toFixed(0x2) + "</td></tr>";
      _0x41c4f0 += "</tbody></table>";
      document.getElementById("profitTableContainer").innerHTML = _0x41c4f0;
    })['catch'](_0x34228a => {
      console.error(_0x34228a);
    });
  }
  ;
  function analyzeFile(_0x24f0a2, _0x23b492, _0x345ee7, _0x42c89f, _0x251cf0) {
    var _0x2b31ac = Number.NEGATIVE_INFINITY;
    var _0x9dbbaa = Number.NEGATIVE_INFINITY;
    var _0x4c7e29 = Number.NEGATIVE_INFINITY;
    for (var _0xe88e44 = 0x0; _0xe88e44 < _0x24f0a2.length; _0xe88e44++) {
      var _0x440ed5 = _0x24f0a2[_0xe88e44];
      var _0xff5a4a = parseFloat(_0x440ed5["<EQUITY>"]);
      var _0x1c72d1 = parseFloat(_0x440ed5['<BALANCE>']);
      var _0x5a3818 = parseDate(_0x440ed5['<DATE>']);
      var _0x106731 = _0x251cf0 === 'equity' ? _0x2b31ac : _0x251cf0 === "greater" ? _0x4c7e29 : _0x9dbbaa;
      var _0x57211d = _0x106731 - _0xff5a4a;
      if (_0x57211d > 0x0) {
        dropTimes.push({
          'date': _0x5a3818,
          'drop': _0x57211d,
          'filename': _0x42c89f
        });
      }
      if (_0xff5a4a > _0x2b31ac) {
        _0x2b31ac = _0xff5a4a;
      }
      if (_0x1c72d1 > _0x9dbbaa) {
        _0x9dbbaa = _0x1c72d1;
      }
      _0x4c7e29 = Math.max(_0x2b31ac, _0x9dbbaa);
    }
  }
  var globalEPcount = 0x0;
  var lastGroupNumber = -0x1;
  function addToTable(_0x36909a, _0x235d98, _0x37fbbb, _0x1c0a05, _0x21f863) {
    var _0x5379e0 = document.getElementById('results_table');
    var _0x23cee9 = _0x5379e0.insertRow(-0x1);
    var _0x2fb408 = _0x1c0a05 % 0x2 === 0x0 ? "#242424" : '#000000';
    _0x23cee9.style.backgroundColor = _0x2fb408;
    var _0x307a7b = _0x23cee9.insertCell(0x0);
    var _0x16bda6 = _0x23cee9.insertCell(0x1);
    var _0x170678 = _0x23cee9.insertCell(0x2);
    var _0x3ee1ef = _0x23cee9.insertCell(0x3);
    var _0x19b4d4 = _0x23cee9.insertCell(0x4);
    _0x307a7b.innerHTML = _0x36909a.toISOString().split('T')[0x0] + ", " + _0x36909a.toISOString().split('T')[0x1].split(":00.000Z")[0x0];
    _0x16bda6.innerHTML = _0x235d98;
    _0x170678.innerHTML = _0x37fbbb.toFixed(0x2);
    _0x3ee1ef.innerHTML = _0x1c0a05;
    _0x19b4d4.innerHTML = _0x21f863.toFixed(0x2);
    var _0x950893 = document.getElementById("global_dd").value;
    if (_0x21f863 && _0x21f863 > _0x950893) {
      _0x19b4d4.classList.add('highlight');
      if (_0x1c0a05 !== lastGroupNumber) {
        globalEPcount++;
        lastGroupNumber = _0x1c0a05;
      }
    }
    var _0x895e89 = document.getElementById("countElementId");
    if (_0x895e89) {
      _0x895e89.innerHTML = "Global EP Threshold exceeded: " + globalEPcount + " times";
    }
  }
  function sortTable() {
    var _0x5bdfda = document.getElementById("results_table");
    var _0x39526c = Array.from(_0x5bdfda.rows).slice(0x1);
    _0x39526c.sort(function (_0x1f22ca, _0x1959fd) {
      var _0x104362 = Number(_0x1f22ca.cells[0x3].innerHTML);
      var _0x5472f9 = Number(_0x1959fd.cells[0x3].innerHTML);
      var _0x17df88 = new Date(_0x1f22ca.cells[0x0].innerHTML);
      var _0x210200 = new Date(_0x1959fd.cells[0x0].innerHTML);
      if (_0x104362 < _0x5472f9) {
        return -0x1;
      } else {
        if (_0x104362 > _0x5472f9) {
          return 0x1;
        } else {
          if (_0x17df88 < _0x210200) {
            return -0x1;
          } else {
            if (_0x17df88 > _0x210200) {
              return 0x1;
            } else {
              return 0x0;
            }
          }
        }
      }
    });
    for (let _0x44700e of _0x39526c) {
      _0x5bdfda.appendChild(_0x44700e);
    }
  }
  function addColumnNames() {
    var _0x61cabe = document.getElementById("results_table");
    var _0x33a7cd = _0x61cabe.createTHead();
    var _0x11a3ea = _0x33a7cd.insertRow(0x0);
    var _0x48e1a1 = _0x11a3ea.insertCell(0x0);
    var _0xa60697 = _0x11a3ea.insertCell(0x1);
    var _0x39e498 = _0x11a3ea.insertCell(0x2);
    var _0x1307f7 = _0x11a3ea.insertCell(0x3);
    var _0x1f3dea = _0x11a3ea.insertCell(0x4);
    _0x48e1a1.innerHTML = "<b>Date, Time</b>";
    _0xa60697.innerHTML = "<b>Optimisation Name_Pass Number</b>";
    _0x39e498.innerHTML = "<b>DD Value $</b>";
    _0x1307f7.innerHTML = "<b>Group Number</b>";
    _0x1f3dea.innerHTML = "<b>Group Global DD</b>";
  }
  document.getElementById('showgraph').addEventListener("click", function () {
    var _0x697cda = document.getElementById("graph");
    var _0x53b485 = this;
    if (_0x697cda.classList.contains("show")) {
      _0x697cda.classList.remove("show");
      _0x53b485.innerHTML = "SHOW GRAPH";
    } else {
      _0x697cda.classList.add('show');
      _0x53b485.innerHTML = "HIDE GRAPH";
      chart.update();
    }
  });
  function getRandomColor() {
    let _0x562c76 = '#';
    for (let _0x15dce8 = 0x0; _0x15dce8 < 0x6; _0x15dce8++) {
      _0x562c76 += "0123456789ABCDEF"[Math.floor(Math.random() * 0x10)];
    }
    return _0x562c76;
  }
  const fileInput = document.getElementById('file');
  const uploadBtn = document.getElementById("uploadBtn");
  const ctx = document.getElementById("myChart").getContext('2d');
  const chart = new Chart(ctx, {
    'type': "line",
    'data': {
      'labels': [],
      'datasets': []
    },
    'options': {
      'scales': {
        'xAxes': [{
          'type': 'time',
          'time': {
            'parser': "YYYY.MM.DD HH:mm",
            'tooltipFormat': "ll HH:mm"
          },
          'scaleLabel': {
            'display': false,
            'labelString': "Date",
            'fontColor': "#999999"
          },
          'ticks': {
            'fontColor': "#999999"
          }
        }],
        'yAxes': [{
          'ticks': {
            'beginAtZero': false,
            'min': 0x0,
            'max': 0x1,
            'fontColor': "#999999"
          },
          'gridLines': {
            'drawOnChartArea': true,
            'color': '#363636',
            'drawTicks': false
          }
        }]
      },
      'tooltips': {
        'intersect': true,
        'mode': "nearest"
      },
      'responsive': true,
      'title': {
        'display': false,
        'text': "Equity Curves"
      },
      'legend': {
        'labels': {
          'fontColor': '#999999'
        }
      },
      'plugins': {
        'zoom': {
          'pan': {
            'enabled': true,
            'mode': 'xy',
            'speed': 0.1,
            'drag': true
          },
          'zoom': {
            'enabled': true,
            'drag': true,
            'mode': 'xy',
            'speed': 0.1
          }
        }
      }
    }
  });
  let minY = Infinity;
  let maxY = -Infinity;
  let initialMinX;
  let initialMaxX;
  function processData(_0xdd1f48) {
    chart.data.datasets = [];
    let _0x15e71f = [];
    let _0x3766b7 = Infinity;
    let _0x145f96 = -Infinity;
    for (let _0x450890 = 0x0; _0x450890 < _0xdd1f48.length; _0x450890++) {
      _0x15e71f = _0x15e71f.concat(_0xdd1f48[_0x450890].data);
    }
    _0x15e71f.sort((_0x2dbf4f, _0x188b25) => moment(_0x2dbf4f[0x0], "YYYY.MM.DD HH:mm").valueOf() - moment(_0x188b25[0x0], "YYYY.MM.DD HH:mm").valueOf());
    for (let _0x16e2c2 of _0x15e71f) {
      const _0x256700 = moment(_0x16e2c2[0x0], "YYYY.MM.DD HH:mm");
      const _0x1c20c0 = _0x256700.valueOf();
      if (_0x1c20c0 < _0x3766b7) {
        _0x3766b7 = _0x1c20c0;
      }
      if (_0x1c20c0 > _0x145f96) {
        _0x145f96 = _0x1c20c0;
      }
      const _0x1d937c = parseFloat(_0x16e2c2[0x2]);
      if (_0x1d937c < minY) {
        minY = _0x1d937c;
      }
      if (_0x1d937c > maxY) {
        maxY = _0x1d937c;
      }
    }
    for (let _0x376904 = 0x0; _0x376904 < _0xdd1f48.length; _0x376904++) {
      const _0x20d84e = _0xdd1f48[_0x376904].data;
      const _0x22d529 = _0x20d84e.map(_0x301683 => ({
        'x': moment(_0x301683[0x0], "YYYY.MM.DD HH:mm").format("YYYY/MM/DD HH:mm"),
        'y': parseFloat(_0x301683[0x2])
      })).sort((_0x466b6f, _0x109f47) => new Date(_0x466b6f.x) - new Date(_0x109f47.x));
      const _0x2b6362 = _0xdd1f48[_0x376904].filename;
      const _0x43d050 = {
        'label': _0x2b6362 + " (Equity)",
        'data': _0x22d529,
        'fill': false,
        'borderColor': getRandomColor(),
        'tension': 0.1,
        'spanGaps': true
      };
      chart.data.datasets.push(_0x43d050);
    }
    initialMinX = moment(_0x3766b7).format("YYYY/MM/DD HH:mm");
    initialMaxX = moment(_0x145f96).format("YYYY/MM/DD HH:mm");
    chart.options.scales.xAxes[0x0].ticks.min = initialMinX;
    chart.options.scales.xAxes[0x0].ticks.max = initialMaxX;
    chart.update();
  }
  var canvas = document.getElementById("myChart");
  var parent = document.getElementById("graph");
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  function toggleFullscreen() {
    let _0x231493 = document.getElementById('graph');
    if (!document.fullscreenElement) {
      if (_0x231493.requestFullscreen) {
        _0x231493.requestFullscreen();
      } else {
        if (_0x231493.mozRequestFullScreen) {
          _0x231493.mozRequestFullScreen();
        } else {
          if (_0x231493.webkitRequestFullscreen) {
            _0x231493.webkitRequestFullscreen();
          } else if (_0x231493.msRequestFullscreen) {
            _0x231493.msRequestFullscreen();
          }
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else {
          if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      }
    }
  }
  showgraph.addEventListener("click", () => {
    var _0x27876d = document.getElementById("toggleBalance");
    const _0x2c3d95 = analysisData.reduce((_0x46bcda, _0x41b2e7) => {
      var _0x13b895 = _0x41b2e7["Optimisation Name"] + '_' + _0x41b2e7["Back Pass"];
      if (csvDataMap[_0x13b895]) {
        var _0x3dad0a = csvDataMap[_0x13b895].split("\n");
        var _0x554c1d = _0x3dad0a.map(_0x1fa676 => _0x1fa676.split("\t"));
        _0x46bcda.push({
          'data': _0x554c1d,
          'filename': _0x13b895
        });
      }
      return _0x46bcda;
    }, []);
    chart.data.datasets = [];
    chart.data.labels = [];
    processData(_0x2c3d95);
    chart.resetZoom();
    chart.options.scales.yAxes[0x0].ticks.min = minY;
    chart.options.scales.yAxes[0x0].ticks.max = maxY;
    chart.options.scales.xAxes[0x0].ticks.min = initialMinX;
    chart.options.scales.xAxes[0x0].ticks.max = initialMaxX;
    chart.update();
    _0x27876d.checked = false;
  });
  document.getElementById("fullscreenBtn").addEventListener("click", function (_0x12f8b5) {
    _0x12f8b5.preventDefault();
    toggleFullscreen();
  });
  document.getElementById("resetZoomBtn").addEventListener("click", function () {
    event.preventDefault();
    chart.resetZoom();
    chart.options.scales.yAxes[0x0].ticks.min = minY;
    chart.options.scales.yAxes[0x0].ticks.max = maxY;
    chart.options.scales.xAxes[0x0].ticks.min = initialMinX;
    chart.options.scales.xAxes[0x0].ticks.max = initialMaxX;
    chart.update();
  });
  document.addEventListener("DOMContentLoaded", function (_0x1f5dc6) {
    document.getElementById("toggleBalance").addEventListener('change', function (_0x3183f7) {
      if (_0x3183f7.target.checked) {
        addBalanceLine();
      } else {
        removeBalanceLine();
      }
    });
  });
  function addBalanceLine() {
    for (let _0xde9bb5 = 0x0; _0xde9bb5 < analysisData.length; _0xde9bb5++) {
      const _0x4742b7 = analysisData[_0xde9bb5];
      const _0x511b5f = _0x4742b7["Optimisation Name"] + '_' + _0x4742b7["Back Pass"];
      const _0x598531 = Papa.parse(csvDataMap[_0x511b5f], {
        'header': true
      }).data;
      const _0x5f0b05 = _0x598531.map(_0xc77d96 => ({
        'x': moment(_0xc77d96["<DATE>"], "YYYY.MM.DD HH:mm").format("YYYY/MM/DD HH:mm"),
        'y': parseFloat(_0xc77d96["<BALANCE>"])
      })).sort((_0x12fe13, _0x77f6c7) => new Date(_0x12fe13.x) - new Date(_0x77f6c7.x));
      const _0x4086a2 = {
        'label': _0x511b5f + " (Balance)",
        'data': _0x5f0b05,
        'fill': false,
        'borderColor': getRandomColor(),
        'tension': 0.1,
        'spanGaps': true
      };
      chart.data.datasets.push(_0x4086a2);
    }
    chart.update();
  }
  function removeBalanceLine() {
    chart.data.datasets = chart.data.datasets.filter(_0x196244 => !_0x196244.label.includes("(Balance)"));
    chart.update();
  }
  document.getElementById('csv_files_2').addEventListener("change", function () {
    var _0x1737ba = this.files;
    for (var _0x4b90bd = 0x0; _0x4b90bd < _0x1737ba.length; _0x4b90bd++) {
      var _0x17d128 = _0x1737ba[_0x4b90bd];
      var _0x529b67 = _0x17d128.name.split('.').pop().toLowerCase();
      if (_0x529b67 !== "csv") {
        alert("Invalid file type. Please only upload .csv files.");
        this.value = '';
        return;
      }
    }
  });
  function parseDate_2(_0x197ba9) {
    if (_0x197ba9) {
      const _0x518cb6 = _0x197ba9.replace(/\./g, '-').replace(" ", 'T') + 'Z';
      return new Date(_0x518cb6);
    } else {
      return null;
    }
  }
  function clearTable_2() {
    var _0x16ac48 = document.getElementById('results_table_2');
    for (var _0x4cf3a4 = _0x16ac48.rows.length - 0x1; _0x4cf3a4 >= 0x0; _0x4cf3a4--) {
      _0x16ac48.deleteRow(_0x4cf3a4);
    }
    globalEPcount2 = 0x0;
    lastGroupNumber2 = -0x1;
  }
  var dropTimes_2 = [];
  function performAnalysis_2() {
    document.body.style.cursor = 'wait';
    clearTable_2();
    addColumnNames_2();
    var dropTreshold = document.getElementById("drop_threshold_2").value;
    var timeDistance = document.getElementById("time_distance_2").value * 0x3c * 0x3e8;
    var measureType = document.getElementById("measure_type_2").value;
    var csvFiles = document.getElementById("csv_files_2").files;
    dropTimes_2 = [];
    var promises = Array.from(csvFiles).map(_0x44bf5f => {
      return new Promise((_0x46a759, _0x4cf6e8) => {
        Papa.parse(_0x44bf5f, {
          'header': true,
          'complete': function (_0x2fdca6) {
            analyzeFile_2(_0x2fdca6.data, dropTreshold, timeDistance, _0x44bf5f.name, measureType);
            _0x46a759();
          },
          'error': function (_0xb2256a) {
            _0x4cf6e8(_0xb2256a);
          }
        });
      });
    });
    Promise.all(promises).then(() => {
      dropTimes_2.sort(function (a, b) {
        return a.date - b.date;
      });
      let dropgroup = [];
      let dropset = new Set();
      for (let i = 0x0; i < dropTimes_2.length; i++) {
        let group = [dropTimes_2[i]];
        for (let j = i + 0x1; j < dropTimes_2.length; j++) {
          if (dropTimes_2[j].date - dropTimes_2[i].date <= timeDistance) {
            let _0x340588 = group.findIndex(_0x567f79 => _0x567f79.filename === dropTimes_2[j].filename);
            if (_0x340588 !== -0x1 && dropTimes_2[j].drop > group[_0x340588].drop) {
              group.splice(_0x340588, 0x1, dropTimes_2[j]);
            } else if (_0x340588 === -0x1) {
              group.push(dropTimes_2[j]);
            }
          } else {
            break;
          }
        }
        let key = group.map(value => value.filename + value.date).sort().join(',');
        if (!dropset.has(key) && 
        !(group.length === 0x1 && 
          dropgroup.some(dg => 
            dg.some(dg2 => 
              dg2.filename === group[0x0].filename && 
              dg2.date === group[0x0].date)))) 
        {
          dropset.add(key);
          dropgroup.push(group);
        }
      }
      var maxgroupSum = 0x0;
      var groupIndex = 0x1;
      for (let dg of dropgroup) {
        dg.sort(function (a, b) {
          return a.date - b.date;
        });
        var totalDrop = dg.reduce((sum, curr) => sum + curr.drop, 0x0);
        if (totalDrop > maxgroupSum) {
          maxgroupSum = totalDrop;
        }
        if (totalDrop >= dropTreshold) {
          for (let value of dg) {
            addToTable_2(value.date, value.filename, value.drop, groupIndex, totalDrop);
          }
          groupIndex++;
        }
      }
      document.getElementById('maxGroupSum_2').textContent = "Maximum Group Global DD: " + maxgroupSum.toFixed(0x2);
      sortTable_2();
    })["catch"](_0x44afb5 => {
      console.error(_0x44afb5);
    });
    sortTable_2();
    let balanceData = {};
    let csvFileData = {};
    let promises = Array.from(csvFiles).map(csvFile => {
      return new Promise((resolve, reject) => {
        let name = csvFile.name;
        csvFileData[name] = {};
        let previousBalance = null;
        Papa.parse(csvFile, {
          'header': true,
          'complete': function (parsedData) {
            for (let row of parsedData.data) {
              const _0x409b38 = moment(row["<DATE>"], "YYYY.MM.DD HH:mm");
              const _0x38b407 = _0x409b38.format("YYYY");
              const _0x3656b7 = _0x409b38.format('MM');
              const _0x3686fb = _0x409b38.format('DD');
              const _0x437a4a = parseFloat(row["<BALANCE>"]);
              if (previousBalance !== null) {
                const _0x542fae = _0x437a4a - previousBalance;
                if (!balanceData[_0x38b407]) {
                  balanceData[_0x38b407] = {};
                }
                if (!balanceData[_0x38b407][_0x3656b7]) {
                  balanceData[_0x38b407][_0x3656b7] = {};
                }
                if (!balanceData[_0x38b407][_0x3656b7][_0x3686fb]) {
                  balanceData[_0x38b407][_0x3656b7][_0x3686fb] = 0x0;
                }
                balanceData[_0x38b407][_0x3656b7][_0x3686fb] += _0x542fae;
                if (!csvFileData[name][_0x38b407]) {
                  csvFileData[name][_0x38b407] = {};
                }
                if (!csvFileData[name][_0x38b407][_0x3656b7]) {
                  csvFileData[name][_0x38b407][_0x3656b7] = 0x0;
                }
                csvFileData[name][_0x38b407][_0x3656b7] += _0x542fae;
              }
              previousBalance = _0x437a4a;
            }
            resolve();
          },
          'error': function (_0x34f50e) {
            reject(_0x34f50e);
          }
        });
      });
    });
    Promise.all(promises).then(() => {
      document.body.style.cursor = "wait";
      let _0x318e81 = "<table id=\"profitTable2\"><thead><tr><th>Year / Month</th>";
      for (let _0x4e6877 = 0x1; _0x4e6877 <= 0xc; _0x4e6877++) {
        _0x318e81 += "<th>" + _0x4e6877 + '</th>';
      }
      _0x318e81 += '<th>Total</th></tr></thead><tbody>';
      let _0x4e8ba9 = Array(0xc).fill(0x0);
      for (let year in balanceData) {
        if (year === "Invalid date") {
          continue;
        }
        let _0x5ec503 = 0x0;
        _0x318e81 += "<tr><th>" + year + '</th>';
        for (let i = 0x1; i <= 0xc; i++) {
          let _0x5bb8ab = 0x0;
          let monthStr = i.toString().padStart(0x2, '0');
          if (balanceData[year][monthStr]) {
            for (let _0x104ca5 in balanceData[year][monthStr]) {
              _0x5bb8ab += balanceData[year][monthStr][_0x104ca5];
            }
          }
          _0x5ec503 += _0x5bb8ab;
          _0x4e8ba9[i - 0x1] += _0x5bb8ab;
          let _0x52d935 = '';
          for (let _0x36f089 in csvFileData) {
            if (csvFileData[_0x36f089][year] && csvFileData[_0x36f089][year][monthStr]) {
              _0x52d935 += _0x36f089 + ": " + csvFileData[_0x36f089][year][monthStr].toFixed(0x2) + "\n";
            }
          }
          _0x318e81 += "<td title=\"" + _0x52d935 + "\">" + _0x5bb8ab.toFixed(0x2) + "</td>";
        }
        _0x318e81 += "<td>" + _0x5ec503.toFixed(0x2) + '</td></tr>';
      }
      _0x318e81 += "<tr><th>Total</th>";
      let _0xa2864f = 0x0;
      for (let _0x4395c9 = 0x0; _0x4395c9 < 0xc; _0x4395c9++) {
        _0x318e81 += "<td>" + _0x4e8ba9[_0x4395c9].toFixed(0x2) + "</td>";
        _0xa2864f += _0x4e8ba9[_0x4395c9];
      }
      _0x318e81 += "<td>" + _0xa2864f.toFixed(0x2) + "</td></tr>";
      _0x318e81 += "</tbody></table>";
      document.getElementById("profitTableContainer2").innerHTML = _0x318e81;
    })["catch"](_0x1bf952 => {
      console.error(_0x1bf952);
    });
  }
  function analyzeFile_2(_0x4540fa, _0x273973, _0x52cc17, _0x525e43, _0x522ca5) {
    var _0xfd1af2 = Number.NEGATIVE_INFINITY;
    var _0xebef9c = Number.NEGATIVE_INFINITY;
    var _0x468a6b = Number.NEGATIVE_INFINITY;
    for (var _0x27f437 = 0x0; _0x27f437 < _0x4540fa.length; _0x27f437++) {
      var _0x5a2ed0 = _0x4540fa[_0x27f437];
      var _0x476a25 = parseFloat(_0x5a2ed0["<EQUITY>"]);
      var _0x46226b = parseFloat(_0x5a2ed0['<BALANCE>']);
      var _0x5db9f6 = parseDate_2(_0x5a2ed0["<DATE>"]);
      var _0x23df5e = _0x522ca5 === 'equity' ? _0xfd1af2 : _0x522ca5 === "greater" ? _0x468a6b : _0xebef9c;
      var _0x2bc257 = _0x23df5e - _0x476a25;
      if (_0x2bc257 > 0x0) {
        dropTimes_2.push({
          'date': _0x5db9f6,
          'drop': _0x2bc257,
          'filename': _0x525e43
        });
      }
      if (_0x476a25 > _0xfd1af2) {
        _0xfd1af2 = _0x476a25;
      }
      if (_0x46226b > _0xebef9c) {
        _0xebef9c = _0x46226b;
      }
      _0x468a6b = Math.max(_0xfd1af2, _0xebef9c);
    }
  }
  var globalEPcount2 = 0x0;
  var lastGroupNumber2 = -0x1;
  function addToTable_2(_0x54d8e1, _0x27f0e, _0xf9c906, _0x436e8b, _0x48d58c) {
    var _0x2b90c1 = document.getElementById("results_table_2");
    var _0x5e1b5c = _0x2b90c1.insertRow(-0x1);
    var _0x20f283 = _0x436e8b % 0x2 === 0x0 ? "#242424" : '#000000';
    _0x5e1b5c.style.backgroundColor = _0x20f283;
    var _0x4aa3f8 = _0x5e1b5c.insertCell(0x0);
    var _0x253aaf = _0x5e1b5c.insertCell(0x1);
    var _0xcde843 = _0x5e1b5c.insertCell(0x2);
    var _0x2ec2af = _0x5e1b5c.insertCell(0x3);
    var _0xf73500 = _0x5e1b5c.insertCell(0x4);
    _0x4aa3f8.innerHTML = _0x54d8e1.toISOString().split('T')[0x0] + ", " + _0x54d8e1.toISOString().split('T')[0x1].split(":00.000Z")[0x0];
    _0x253aaf.innerHTML = _0x27f0e;
    _0xcde843.innerHTML = _0xf9c906.toFixed(0x2);
    _0x2ec2af.innerHTML = _0x436e8b;
    _0xf73500.innerHTML = _0x48d58c.toFixed(0x2);
    var _0x4410f6 = document.getElementById('global_dd_2').value;
    if (_0x48d58c && _0x48d58c > _0x4410f6) {
      _0xf73500.classList.add("highlight");
      if (_0x436e8b !== lastGroupNumber2) {
        globalEPcount2++;
        lastGroupNumber2 = _0x436e8b;
      }
    }
    var _0x306f95 = document.getElementById("countElementId2");
    if (_0x306f95) {
      _0x306f95.innerHTML = "Global EP Threshold exceeded: " + globalEPcount2 + " times";
    }
  }
  function sortTable_2() {
    var _0x1b4bd5 = document.getElementById('results_table_2');
    var _0x1000ee = Array.from(_0x1b4bd5.rows).slice(0x1);
    _0x1000ee.sort(function (_0x19999f, _0xc0e8de) {
      var _0x2b1c61 = Number(_0x19999f.cells[0x3].innerHTML);
      var _0x58634a = Number(_0xc0e8de.cells[0x3].innerHTML);
      var _0x4bb474 = new Date(_0x19999f.cells[0x0].innerHTML);
      var _0x1a5c83 = new Date(_0xc0e8de.cells[0x0].innerHTML);
      if (_0x2b1c61 < _0x58634a) {
        return -0x1;
      } else {
        if (_0x2b1c61 > _0x58634a) {
          return 0x1;
        } else {
          if (_0x4bb474 < _0x1a5c83) {
            return -0x1;
          } else {
            if (_0x4bb474 > _0x1a5c83) {
              return 0x1;
            } else {
              return 0x0;
            }
          }
        }
      }
    });
    for (let _0xf1e93f of _0x1000ee) {
      _0x1b4bd5.appendChild(_0xf1e93f);
    }
  }
  function addColumnNames_2() {
    var _0x1c6461 = document.getElementById("results_table_2");
    var _0x44428f = _0x1c6461.createTHead();
    var _0x24953a = _0x44428f.insertRow(0x0);
    var _0x2a4d2d = _0x24953a.insertCell(0x0);
    var _0x50a722 = _0x24953a.insertCell(0x1);
    var _0x113702 = _0x24953a.insertCell(0x2);
    var _0x34da15 = _0x24953a.insertCell(0x3);
    var _0x2f1ba6 = _0x24953a.insertCell(0x4);
    _0x2a4d2d.innerHTML = '<b>Date/Time</b>';
    _0x50a722.innerHTML = "<b>Filename</b>";
    _0x113702.innerHTML = "<b>DD Value $</b>";
    _0x34da15.innerHTML = "<b>Group Number</b>";
    _0x2f1ba6.innerHTML = "<b>Group Global DD</b>";
  }
  document.getElementById("showgraph_2").addEventListener('click', function () {
    var _0x3ae10a = document.getElementById("graph_2");
    var _0x30f1b2 = this;
    if (_0x3ae10a.classList.contains("show")) {
      _0x3ae10a.classList.remove("show");
      _0x30f1b2.innerHTML = "SHOW GRAPH";
    } else {
      _0x3ae10a.classList.add('show');
      _0x30f1b2.innerHTML = "HIDE GRAPH";
      chart_2.update();
    }
  });
  function getRandomColor_2() {
    let _0x30b2de = '#';
    for (let _0x4bc1b1 = 0x0; _0x4bc1b1 < 0x6; _0x4bc1b1++) {
      _0x30b2de += "0123456789ABCDEF"[Math.floor(Math.random() * 0x10)];
    }
    return _0x30b2de;
  }
  const fileInput_2 = document.getElementById("csv_files_2");
  const uploadBtn_2 = document.getElementById("ddanal_2");
  const ctx_2 = document.getElementById('myChart_2').getContext('2d');
  let minY2 = Infinity;
  let maxY2 = -Infinity;
  let initialMinX2;
  let initialMaxX2;
  const chart_2 = new Chart(ctx_2, {
    'type': 'line',
    'data': {
      'labels': [],
      'datasets': []
    },
    'options': {
      'elements': {
        'point': {
          'radius': 2,
          'hoverRadius': 5
        }
      },
      'scales': {
        'xAxes': [{
          'type': "time",
          'time': {
            'parser': "YYYY.MM.DD HH:mm",
            'tooltipFormat': "ll HH:mm"
          },
          'scaleLabel': {
            'display': false,
            'labelString': 'Date',
            'fontColor': "#999999"
          },
          'ticks': {
            'autoSkip': true,
            'fontColor': "#999999"
          }
        }],
        'yAxes': [{
          'ticks': {
            'autoSkip': true,
            'suggestedMin': 56944,
            'suggestedMax': 131584,
            'fontColor': "#999999"
          },
          'gridLines': {
            'drawOnChartArea': true,
            'color': "#363636",
            'drawTicks': false
          }
        }]
      },
      'tooltips': {
        'intersect': true,
        'mode': "nearest"
      },
      'responsive': true,
      'title': {
        'display': false,
        'text': "Equity Curves"
      },
      'legend': {
        'labels': {
          'fontColor': "#999999"
        }
      },
      'plugins': {
        'zoom': {
          'pan': {
            'enabled': true,
            'mode': 'xy',
            'speed': 0.1,
            'drag': true
          },
          'zoom': {
            'enabled': true,
            'drag': true,
            'mode': 'xy',
            'speed': 0.1
          }
        }
      }
    }
  });
  function processData_2(_0x5dbd63) {
    document.body.style.cursor = "wait";
    requestIdleCallback(() => {
      let _0x406b28 = new Map();
      let _0x17023c = new Map();
      let _0xbdf992 = new Map();
      let _0x2725e0 = new Map();
      let _0x4cd301 = new Set();
      let _0x3a1714 = new Map();
      let _0x345613 = parseFloat(_0x5dbd63[0x0].data[0x1][0x1]);
      let _0x5823dc = new Map();
      let _0x595c6c = new Map();
      chart_2.data.datasets = [];
      _0x5dbd63.forEach(_0x21d5ce => {
        const _0x4cb822 = parseFloat(_0x21d5ce.data[0x1][0x1]);
        _0x3a1714.set(_0x21d5ce.filename, _0x4cb822);
      });
      _0x5dbd63.forEach(_0x136450 => {
        _0xbdf992.set(_0x136450.filename, _0x3a1714.get(_0x136450.filename));
        _0x2725e0.set(_0x136450.filename, _0x3a1714.get(_0x136450.filename));
      });
      _0x5dbd63.forEach(_0x538f27 => {
        _0x538f27.data.slice(0x1, -0x1).forEach(_0x33e87d => {
          const _0x26f83f = moment(_0x33e87d[0x0], "YYYY-MM-DD HH:mm").valueOf();
          if (!isNaN(_0x26f83f)) {
            _0x4cd301.add(_0x26f83f);
            if (!_0x5823dc[_0x26f83f]) {
              _0x5823dc[_0x26f83f] = {};
              _0x595c6c[_0x26f83f] = {};
            }
            _0x5823dc[_0x26f83f][_0x538f27.filename] = parseFloat(_0x33e87d[0x2]);
            _0x595c6c[_0x26f83f][_0x538f27.filename] = parseFloat(_0x33e87d[0x1]);
          }
        });
      });
      minY2 = Infinity;
      maxY2 = -Infinity;
      _0x4cd301 = Array.from(_0x4cd301).sort((a, b) => a - b);
      _0x4cd301.forEach(_0x32ca41 => {
        let _0x5dd9a8 = 0x0;
        let _0x59cb4c = 0x0;
        _0x5dbd63.forEach(_0x1a692b => {
          if (_0x5823dc[_0x32ca41][_0x1a692b.filename]) {
            _0xbdf992.set(_0x1a692b.filename, _0x5823dc[_0x32ca41][_0x1a692b.filename]);
          }
          _0x5dd9a8 += _0xbdf992.get(_0x1a692b.filename) - _0x3a1714.get(_0x1a692b.filename);
          if (_0x595c6c[_0x32ca41][_0x1a692b.filename]) {
            _0x2725e0.set(_0x1a692b.filename, _0x595c6c[_0x32ca41][_0x1a692b.filename]);
          }
          _0x59cb4c += _0x2725e0.get(_0x1a692b.filename) - _0x3a1714.get(_0x1a692b.filename);
        });
        const _0x1b8e9b = _0x5dd9a8 + _0x345613;
        const _0x5266f0 = _0x59cb4c + _0x345613;
        _0x406b28.set(_0x32ca41, _0x1b8e9b);
        _0x17023c.set(_0x32ca41, _0x5266f0);
        if (_0x1b8e9b < minY2) {
          minY2 = _0x1b8e9b;
        }
        if (_0x1b8e9b > maxY2) {
          maxY2 = _0x1b8e9b;
        }
        if (_0x5266f0 < minY2) {
          minY2 = _0x5266f0;
        }
        if (_0x5266f0 > maxY2) {
          maxY2 = _0x5266f0;
        }
      });
      let _0x228ec9 = document.getElementById('balanceCheckbox_2').checked;
      requestAnimationFrame(() => {
        chart_2.options.scales.yAxes[0x0].ticks.suggestedMin = minY2;
        chart_2.options.scales.yAxes[0x0].ticks.suggestedMax = maxY2;
        _0x5dbd63.forEach(_0x3f062b => {
          const _0x28a2b5 = _0x3f062b.data.slice(0x1, -0x1).map(([_0x1578b4, _0xb480f1, _0x10f946]) => {
            return {
              'x': _0x1578b4,
              'y': parseFloat(_0x10f946)
            };
          });
          const _0x354466 = _0x3f062b.data.slice(0x1, -0x1).map(([_0x33ce0a, _0x53770a, _0x2ed681]) => {
            return {
              'x': _0x33ce0a,
              'y': parseFloat(_0x53770a)
            };
          });
          const _0x9a3690 = {
            'label': _0x3f062b.filename + " (Equity)",
            'data': _0x28a2b5,
            'fill': false,
            'borderColor': getRandomColor_2(),
            'tension': 0.1,
            'spanGaps': true
          };
          const _0x4dd464 = {
            'label': _0x3f062b.filename + " (Balance)",
            'data': _0x354466,
            'fill': false,
            'borderColor': getRandomColor_2(),
            'tension': 0.1,
            'spanGaps': true
          };
          chart_2.data.datasets.push(_0x9a3690);
          if (_0x228ec9) {
            chart_2.data.datasets.push(_0x4dd464);
          }
        });
        const _0x3128d3 = Array.from(_0x406b28.entries()).sort((_0x56979d, _0x2643ba) => _0x56979d[0x0] - _0x2643ba[0x0]).map(([_0x3b79b7, _0x468ff2]) => ({
          'x': moment(_0x3b79b7).format("YYYY-MM-DD HH:mm"),
          'y': _0x468ff2
        }));
        const _0x2ff99b = Array.from(_0x17023c.entries()).sort((_0x1a3005, _0x180485) => _0x1a3005[0x0] - _0x180485[0x0]).map(([_0x1d4dfe, _0x3673da]) => ({
          'x': moment(_0x1d4dfe).format("YYYY-MM-DD HH:mm"),
          'y': _0x3673da
        }));
        const _0x3cc31c = {
          'label': "Combined (Equity)",
          'data': _0x3128d3,
          'fill': false,
          'borderColor': "white",
          'tension': 0.1,
          'spanGaps': true
        };
        const _0x28c266 = {
          'label': "Combined (Balance)",
          'data': _0x2ff99b,
          'fill': false,
          'borderColor': "#00ff00",
          'tension': 0.1,
          'spanGaps': true
        };
        chart_2.data.datasets.push(_0x3cc31c);
        if (_0x228ec9) {
          chart_2.data.datasets.push(_0x28c266);
        }
        const _0x53527a = moment(Math.min(..._0x4cd301)).format("YYYY-MM-DD HH:mm");
        const _0x14982f = moment(Math.max(..._0x4cd301)).format("YYYY-MM-DD HH:mm");
        chart_2.options.scales.xAxes[0x0].ticks.min = _0x53527a;
        chart_2.options.scales.xAxes[0x0].ticks.max = _0x14982f;
        chart_2.update();
        document.body.style.cursor = "default";
      });
    });
  }
  ddanal_2.addEventListener("click", () => {
    document.body.style.cursor = 'wait';
    const csvFiles = fileInput_2.files;
    const data = [];
    for (let i = 0x0; i < csvFiles.length; i++) {
      const file = csvFiles[i];
      const fileReader = new FileReader();
      fileReader.onload = function (_0x44e002) {
        const dataResult = _0x44e002.target.result;
        const arrayDataResult = dataResult.split("\n");
        const newData = [];
        for (let j = 0x0; j < arrayDataResult.length; j++) {
          const valueWithoutTab = arrayDataResult[j].split("\t");
          newData.push(valueWithoutTab);
        }
        data.push({
          'data': newData,
          'filename': file.name
        });
        if (data.length === csvFiles.length) {
          processData_2(data);
        }
      };
      fileReader.readAsText(file);
    }
    chart_2.update();
  });
  function toggleFullscreen_2() {
    let _0x277818 = document.getElementById("graph_2");
    if (!document.fullscreenElement) {
      if (_0x277818.requestFullscreen) {
        _0x277818.requestFullscreen();
      } else {
        if (_0x277818.mozRequestFullScreen) {
          _0x277818.mozRequestFullScreen();
        } else {
          if (_0x277818.webkitRequestFullscreen) {
            _0x277818.webkitRequestFullscreen();
          } else if (_0x277818.msRequestFullscreen) {
            _0x277818.msRequestFullscreen();
          }
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else {
          if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else {
            if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          }
        }
      }
    }
  }
  document.getElementById("fullscreenBtn_2").addEventListener("click", function (_0x2ec3cf) {
    _0x2ec3cf.preventDefault();
    toggleFullscreen_2();
  });
  document.getElementById("resetZoomBtn_2").addEventListener("click", function (_0x12e706) {
    _0x12e706.preventDefault();
    chart_2.resetZoom();
    chart_2.options.scales.yAxes[0x0].ticks.min = minY2;
    chart_2.options.scales.yAxes[0x0].ticks.max = maxY2;
    chart_2.options.scales.yAxes[0x0].ticks.suggestedMin = minY2;
    chart_2.options.scales.yAxes[0x0].ticks.suggestedMax = maxY2;
    chart_2.update();
  });
  document.getElementById('balanceCheckbox_2').addEventListener("change", () => {
    const _0x76f4f4 = fileInput_2.files;
    const _0x1a0e1c = [];
    for (let _0x26e92f = 0x0; _0x26e92f < _0x76f4f4.length; _0x26e92f++) {
      const _0x13c281 = _0x76f4f4[_0x26e92f];
      const _0x59d2af = new FileReader();
      _0x59d2af.onload = function (_0xa6dc58) {
        const _0xca3487 = _0xa6dc58.target.result;
        const _0x2d79af = _0xca3487.split("\n");
        const _0x260554 = [];
        for (let _0x140661 = 0x0; _0x140661 < _0x2d79af.length; _0x140661++) {
          const _0x7478c = _0x2d79af[_0x140661].split("\t");
          _0x260554.push(_0x7478c);
        }
        _0x1a0e1c.push({
          'data': _0x260554,
          'filename': _0x13c281.name
        });
        if (_0x1a0e1c.length === _0x76f4f4.length) {
          processData_2(_0x1a0e1c);
        }
      };
      _0x59d2af.readAsText(_0x13c281);
    }
  });
  document.addEventListener('DOMContentLoaded', function () {
    var _0x40ae16 = ["balance", "profitMatchLower", "profitMatchUpper", "backRecoveryFactor", "forwardRecoveryFactor", "backResult", "forwardResult", "targetDD", "drop_threshold", 'time_distance', "global_dd", "drop_threshold_2", "time_distance_2", "global_dd_2"];
    _0x40ae16.forEach(function (_0x409cc5) {
      var _0xc190eb = document.getElementById(_0x409cc5);
      var _0x190430 = localStorage.getItem(_0x409cc5);
      if (_0x190430 !== null) {
        _0xc190eb.value = _0x190430;
      }
      _0xc190eb.addEventListener("input", function () {
        localStorage.setItem(_0x409cc5, this.value);
      });
    });
  });
  document.getElementById("reset").addEventListener("click", function () {
    localStorage.clear();
    var _0x2a366a = ['balance', 'profitMatchLower', "profitMatchUpper", "backRecoveryFactor", 'forwardRecoveryFactor', "backResult", "forwardResult", 'targetDD', 'drop_threshold', 'time_distance', 'global_dd', "drop_threshold_2", "time_distance_2", "global_dd_2"];
    var _0x5c40f3 = ['100000', '0', "999", '0', '0', '0', '0', '1000', "1000", '30', '4000', "1000", '30', "4000"];
    for (var _0x639e82 = 0x0; _0x639e82 < _0x2a366a.length; _0x639e82++) {
      document.getElementById(_0x2a366a[_0x639e82]).value = _0x5c40f3[_0x639e82];
    }
  });
  document.getElementById("popupButton").addEventListener("click", function () {
    document.getElementById("popupOverlay").style.display = "flex";
  });
  ["weekOrMonth", 'backLength', 'forwardLength', "endDate"].forEach(_0x5a0edc => {
    document.getElementById(_0x5a0edc).addEventListener("change", calculateDates);
  });
  window.onload = function () {
    const _0x5c52e7 = new Date();
    document.getElementById("endDate").value = _0x5c52e7.toISOString().slice(0x0, 0xa);
    calculateDates(_0x5c52e7);
  };
  function calculateDates() {
    const _0x1cf92e = document.getElementById("weekOrMonth").value;
    const _0x134071 = Number(document.getElementById('backLength').value);
    const _0x4d52ae = Number(document.getElementById("forwardLength").value);
    let _0x2ee8d1 = document.getElementById('endDate').value;
    const [_0x5a90ab, _0x1e90a3, _0x46cc70] = _0x2ee8d1.split('-').map(Number);
    if (!_0x2ee8d1) {
      document.getElementById("startDate").value = "1900-01-01";
      document.getElementById("forwardDate").value = "1900-01-01";
      document.getElementById("startDate").style.color = "red";
      document.getElementById("forwardDate").style.color = "red";
      document.getElementById('endDate').style.color = "red";
      return;
    }
    const _0x121a60 = new Date(_0x5a90ab, _0x1e90a3 - 0x1, _0x46cc70);
    const _0x19f962 = _0x134071 + _0x4d52ae;
    let _0x5292f6 = new Date(_0x121a60);
    let _0x90553 = new Date(_0x121a60);
    if (_0x1cf92e === "week") {
      _0x5292f6.setDate(_0x121a60.getDate() - _0x19f962 * 0x7);
      _0x90553.setDate(_0x121a60.getDate() - _0x4d52ae * 0x7);
    } else {
      _0x5292f6 = subtractMonths(_0x5292f6, _0x19f962);
      _0x90553 = subtractMonths(_0x90553, _0x4d52ae);
    }
    document.getElementById('startDate').value = _0x5292f6.toISOString().slice(0x0, 0xa);
    document.getElementById("forwardDate").value = _0x90553.toISOString().slice(0x0, 0xa);
    document.getElementById("startDate").style.color = "white";
    document.getElementById("forwardDate").style.color = "white";
    document.getElementById('endDate').style.color = "white";
  }
  function subtractMonths(_0x2749d1, _0x41dc6b) {
    const _0x1e6843 = _0x2749d1.getDate();
    _0x2749d1.setMonth(_0x2749d1.getMonth() - _0x41dc6b);
    if (_0x2749d1.getDate() != _0x1e6843) {
      _0x2749d1.setDate(0x0);
    }
    return _0x2749d1;
  }
  document.getElementById("closeButton").onclick = function () {
    document.getElementById('popupOverlay').style.display = "none";
  };
  document.getElementById("popupOverlay").onclick = function () {
    document.getElementById("popupOverlay").style.display = "none";
  };
  document.getElementById("popupDates").onclick = function (_0xd17586) {
    _0xd17586.stopPropagation();
  };
  document.getElementById("xml-setPopup").addEventListener("click", function (_0xcee1fb) {
    _0xcee1fb.preventDefault();
    document.getElementById("popupOverlay2").style.display = 'flex';
  });
  document.getElementById("closeButton2").onclick = function (_0x1cac9f) {
    _0x1cac9f.preventDefault();
    document.getElementById("popupOverlay2").style.display = "none";
  };
  document.getElementById("popupOverlay2").onclick = function (_0x46fc37) {
    _0x46fc37.preventDefault();
    document.getElementById("popupOverlay2").style.display = 'none';
  };
  document.getElementById("xml-setPopup").addEventListener("click", function () {
    document.getElementById('popupOverlay2').style.display = 'flex';
    var _0x40539b = document.getElementById('xmlFile');
    var _0x534441 = _0x40539b.options.length;
    for (i = _0x534441 - 0x1; i >= 0x0; i--) {
      _0x40539b.options[i] = null;
    }
    window.uploadedFiles.forEach((_0x12b70c, _0x578099) => {
      var _0x242dbf = document.createElement('option');
      _0x242dbf.value = _0x578099;
      _0x242dbf.textContent = _0x12b70c.name;
      _0x40539b.appendChild(_0x242dbf);
    });
  });
  document.getElementById("closeButton2").onclick = function () {
    document.getElementById("popupOverlay2").style.display = "none";
  };
  document.getElementById('popupOverlay2').onclick = function () {
    document.getElementById("popupOverlay2").style.display = 'none';
  };
  document.getElementById("popupConverter").onclick = function (_0x1e674b) {
    _0x1e674b.stopPropagation();
  };
  var xmlFileDropdown = document.getElementById("xmlFile");
  window.uploadedFiles.forEach((_0x49d157, _0x5081fa) => {
    var _0x27cab7 = document.createElement("option");
    _0x27cab7.value = _0x5081fa;
    _0x27cab7.textContent = _0x49d157.name;
    xmlFileDropdown.appendChild(_0x27cab7);
  });
  xmlFileDropdown.addEventListener("change", function (_0x30a5e1) {
    var _0x2f6822 = window.uploadedFiles[_0x30a5e1.target.value];
    document.getElementById("xmlFileName").textContent = _0x2f6822.name;
  });
  const loadXML = _0x8480ef => new Promise((_0x4576c0, _0x187a63) => {
    const _0x3c0d9a = window.uploadedFiles[_0x8480ef];
    const _0x17e990 = new FileReader();
    _0x17e990.onload = () => {
      const _0x4614de = new DOMParser();
      const _0x2b195b = _0x4614de.parseFromString(_0x17e990.result, "text/xml");
      _0x4576c0(_0x2b195b);
    };
    _0x17e990.onerror = _0x187a63;
    _0x17e990.readAsText(_0x3c0d9a);
  });
  const xmlToTableJson = _0x5c77dd => {
    let _0x4f2338 = [];
    let _0x38e3d3 = [];
    let _0x1bed56 = _0x5c77dd.querySelectorAll("Worksheet Table Row:first-child Cell");
    for (let _0x9decdf of _0x1bed56) {
      _0x4f2338.push(_0x9decdf.textContent);
    }
    let _0x3c9e99 = _0x5c77dd.querySelectorAll("Worksheet Table Row:not(:first-child)");
    for (let _0x1478ef of _0x3c9e99) {
      let _0x2be8ba = _0x1478ef.querySelectorAll('Cell');
      let _0x553330 = {};
      for (let _0x545f1c = 0x0; _0x545f1c < _0x2be8ba.length; _0x545f1c++) {
        _0x553330[_0x4f2338[_0x545f1c]] = _0x2be8ba[_0x545f1c].textContent;
      }
      _0x38e3d3.push(_0x553330);
    }
    return _0x38e3d3;
  };
  document.getElementById("setFile").addEventListener("change", function () {
    var _0x5036a4 = this.files;
    for (var _0x3a662f = 0x0; _0x3a662f < _0x5036a4.length; _0x3a662f++) {
      var _0x195f6a = _0x5036a4[_0x3a662f];
      var _0x36b1dd = _0x195f6a.name.split('.').pop().toLowerCase();
      if (_0x36b1dd !== "set") {
        alert("Invalid file type. Please only upload .set files.");
        this.value = '';
        return;
      }
    }
  });
  const loadSetTemplate = _0x161f8f => new Promise((_0x211c93, _0x5b4e82) => {
    const _0x560b7c = _0x161f8f.files[0x0];
    const _0x350fe0 = new FileReader();
    _0x350fe0.onload = () => _0x211c93(_0x350fe0.result);
    _0x350fe0.onerror = _0x5b4e82;
    _0x350fe0.readAsText(_0x560b7c);
  });
  var xmlFile = document.getElementById("xmlFile");
  var xmlFileName = document.getElementById("xmlFileName");
  xmlFile.addEventListener("change", function (_0x675a7c) {
    var _0x3dc967 = _0x675a7c.target.files[0x0].name;
    xmlFileName.textContent = _0x3dc967;
  });
  var setFile = document.getElementById('setFile');
  var setFileName = document.getElementById("setFileName");
  setFile.addEventListener("change", function (_0xb4754f) {
    var _0x172b1a = _0xb4754f.target.files[0x0].name;
    setFileName.textContent = _0x172b1a;
  });
  const extractParamNames = _0x109cca => {
    const _0x112a6b = _0x109cca.matchAll(/(\w+)=\S+\|\|/g);
    const _0x48d5b2 = [..._0x112a6b].map(_0x5042d1 => _0x5042d1[0x1]);
    return _0x48d5b2;
  };
  const generateFiles = async () => {
    document.body.style.cursor = "wait";
    const _0x7105ad = document.getElementById('xmlFile');
    const _0x5595b2 = document.getElementById("setFile");
    const _0x255ff0 = window.mergedData;
    let _0x3e419a = document.getElementById('applyMultiplier').checked;
    try {
      const _0x356939 = await loadXML(_0x7105ad.value);
      const _0x347bb4 = xmlToTableJson(_0x356939);
      const _0x49387c = await loadSetTemplate(_0x5595b2);
      const _0x3ff014 = extractParamNames(_0x49387c);
      const _0x51dcfa = [".forward", ".Forward", " Forward", " forward", ".fwd", ".Fwd", ".FORWARD", " FORWARD", " FWD", '.FWD', " fwd", " Fwd", "-fwd", '-Fwd', '-FWD', "-Forward", "-forward", '-FORWARD', "_fwd", "_Fwd", "_FWD", "_forward", "_Forward", "_FORWARD"];
      const _0x2f707c = [];
      _0x347bb4.forEach(_0x33c659 => {
        let _0x5c2226 = _0x49387c;
        let _0x3de8ac = window.uploadedFiles[_0x7105ad.value].name.replace(".xml", '') + '_' + _0x33c659.Pass;
        let _0x4813be = 0x1;
        _0x51dcfa.forEach(_0x4d4c3a => {
          _0x3de8ac = _0x3de8ac.replace(_0x4d4c3a, '');
        });
        const _0x40d2b4 = _0x255ff0.find(_0x76224d => _0x76224d["Optimisation Name"] + '_' + _0x76224d["Back Pass"] === _0x3de8ac);
        let _0x1d0dd6 = 0x1;
        if (_0x40d2b4 !== undefined) {
          _0x1d0dd6 = _0x40d2b4["Lot Multiplier_"];
        }
        if (_0x33c659.LotSize === undefined) {
          const _0x3c59b3 = /\bLotSize=([^|]+)\|\|/g.exec(_0x5c2226);
          if (_0x3c59b3) {
            _0x33c659.LotSize = _0x3c59b3[0x1];
          }
        }
        if (_0x33c659.MaxLots === undefined) {
          const _0x3aa4e1 = /\bMaxLots=([^|]+)\|\|/g.exec(_0x5c2226);
          if (_0x3aa4e1) {
            _0x33c659.MaxLots = _0x3aa4e1[0x1];
          }
        }
        if (_0x33c659.ProfitCloseEquityAmount === undefined) {
          const _0x508cc8 = /\bProfitCloseEquityAmount=([^|]+)\|\|/g.exec(_0x5c2226);
          if (_0x508cc8) {
            _0x33c659.ProfitCloseEquityAmount = _0x508cc8[0x1];
          }
        }
        if (_0x33c659.MaxLossDailyInCurrency === undefined) {
          const _0x4c5474 = /\bMaxLossDailyInCurrency=([^|]+)\|\|/g.exec(_0x5c2226);
          if (_0x4c5474) {
            _0x33c659.MaxLossDailyInCurrency = _0x4c5474[0x1];
          }
        }
        if (_0x33c659.InitialLotSize === undefined) {
          const _0x1118d5 = /\bInitialLotSize=([^|]+)\|\|/g.exec(_0x5c2226);
          if (_0x1118d5) {
            _0x33c659.InitialLotSize = _0x1118d5[0x1];
          }
        }
        if (_0x33c659.InitialMaxLoss === undefined) {
          const _0x22583c = /\bInitialMaxLoss=([^|]+)\|\|/g.exec(_0x5c2226);
          if (_0x22583c) {
            _0x33c659.InitialMaxLoss = _0x22583c[0x1];
          }
        }
        if (_0x33c659.MaxDailyLossTrail === undefined) {
          const _0x108699 = /\bMaxDailyLossTrail=([^|]+)\|\|/g.exec(_0x5c2226);
          if (_0x108699) {
            _0x33c659.MaxDailyLossTrail = _0x108699[0x1];
          }
        }
        _0x3ff014.forEach(_0x261523 => {
          let _0x4eb406 = _0x33c659[_0x261523];
          if (_0x3e419a) {
            if (_0x261523 === "LotSize") {
              let _0x88f295 = Number((Number(_0x4eb406) * _0x1d0dd6).toFixed(0x2));
              _0x88f295 = Math.max(_0x88f295, 0.01);
              _0x4813be = _0x88f295 / Number(_0x4eb406);
              _0x4eb406 = _0x88f295;
            } else if (_0x261523 === "MaxLots" || _0x261523 === "ProfitCloseEquityAmount" || _0x261523 === "MaxLossDailyInCurrency" || _0x261523 === "InitialLotSize" || _0x261523 === "InitialMaxLoss" || _0x261523 === "MaxDailyLossTrail") {
              _0x4eb406 = Number((Number(_0x4eb406) * _0x4813be).toFixed(0x2));
            }
          }
          if (_0x4eb406 !== undefined) {
            const _0x10bd8b = new RegExp("\\b(" + _0x261523 + ")=([^|]+)\\|\\|", 'g');
            _0x5c2226 = _0x5c2226.replace(_0x10bd8b, _0x261523 + '=' + _0x4eb406 + '||');
          }
        });
        const _0x112b2d = new Blob([_0x5c2226]);
        const _0x553964 = URL.createObjectURL(_0x112b2d);
        const _0x512ee6 = _0x3de8ac + ".set";
        const _0x4bb0fc = document.createElement('a');
        _0x4bb0fc.href = _0x553964;
        _0x4bb0fc.download = _0x512ee6;
        _0x4bb0fc.textContent = _0x512ee6;
        _0x2f707c.push(_0x4bb0fc);
      });
      _0x2f707c.sort((_0x5ed598, _0x34a47f) => {
        const _0x1aa3bc = parseInt(_0x5ed598.textContent.match(/\d+/)[0x0], 0xa);
        const _0x5a47c7 = parseInt(_0x34a47f.textContent.match(/\d+/)[0x0], 0xa);
        return _0x1aa3bc - _0x5a47c7;
      });
      const _0x29ec32 = document.getElementById("results");
      _0x2f707c.forEach(_0x2e07a0 => _0x29ec32.appendChild(_0x2e07a0));
    } catch (_0x58c6fc) {
      console.error("Error generating filecons", _0x58c6fc);
      showToast("Error generating files");
    } finally {
      document.body.style.cursor = 'default';
    }
  };
  const downloadAll = async () => {
    document.body.style.cursor = "wait";
    const _0x5ccdd6 = Array.from(document.getElementById("results").children).filter(_0x56704f => _0x56704f.nodeName === 'A');
    const _0x4fb051 = new JSZip();
    let _0x486bf2 = Promise.resolve();
    for (let _0x4ba18f of _0x5ccdd6) {
      _0x486bf2 = _0x486bf2.then(() => fetch(_0x4ba18f.href).then(_0x491c5e => _0x491c5e.blob()).then(_0x41b996 => {
        _0x4fb051.file(_0x4ba18f.download, _0x41b996);
      }));
    }
    _0x486bf2.then(() => _0x4fb051.generateAsync({
      'type': "blob"
    })).then(_0x2b4081 => {
      const _0x27e9a9 = URL.createObjectURL(_0x2b4081);
      const _0x40aaf2 = document.createElement('a');
      _0x40aaf2.href = _0x27e9a9;
      _0x40aaf2.download = _0x5ccdd6[0x0].download.split('_')[0x0] + "_All Sets.zip";
      _0x40aaf2.click();
    });
    document.body.style.cursor = 'default';
  };
  document.getElementById("convert").addEventListener("click", generateFiles);
  document.getElementById("downloadAll").addEventListener("click", downloadAll);
  function filterResults() {
    const _0x300d1a = document.getElementById('filter').value.toLowerCase();
    const _0x5ea102 = _0x300d1a.split(',').map(_0x3451e2 => _0x3451e2.trim());
    const _0x27b321 = document.getElementById("filter2").value.toLowerCase();
    const _0x31c457 = document.getElementById('results').getElementsByTagName('a');
    for (let _0x17594a = 0x0; _0x17594a < _0x31c457.length; _0x17594a++) {
      const _0x29dc91 = _0x31c457[_0x17594a];
      const _0x5729ce = _0x29dc91.textContent;
      const _0x1ea9fb = _0x5729ce.toLowerCase();
      const _0x38a68a = _0x5729ce.split('_');
      _0x38a68a.pop();
      const _0x2b3bae = _0x38a68a.join('_').toLowerCase();
      const _0x311be9 = _0x5ea102.some(_0x1018da => _0x1ea9fb.includes('_' + _0x1018da + '.set'));
      const _0x36662f = _0x2b3bae.includes(_0x27b321);
      if ((_0x300d1a === '' || _0x311be9) && (_0x27b321 === '' || _0x36662f)) {
        _0x29dc91.style.display = 'block';
      } else {
        _0x29dc91.style.display = "none";
      }
    }
  }
  document.getElementById("filter").addEventListener("keyup", filterResults);
  document.getElementById("filter2").addEventListener('keyup', filterResults);
  const downloadAllFiltered = () => {
    const _0x1098b1 = Array.from(document.getElementById("results").children).filter(_0x1ea29f => _0x1ea29f.nodeName === 'A' && _0x1ea29f.style.display !== 'none');
    if (_0x1098b1.length === 0x0) {
      return;
    }
    const _0xce2aab = new JSZip();
    let _0x5dab3e = Promise.resolve();
    for (let _0x5106ec of _0x1098b1) {
      _0x5dab3e = _0x5dab3e.then(() => fetch(_0x5106ec.href).then(_0x6969d9 => _0x6969d9.blob()).then(_0x380f3c => {
        _0xce2aab.file(_0x5106ec.download, _0x380f3c);
      }));
    }
    _0x5dab3e.then(() => _0xce2aab.generateAsync({
      'type': 'blob'
    })).then(_0x49549c => {
      const _0x22a663 = URL.createObjectURL(_0x49549c);
      const _0x1f11ab = document.createElement('a');
      _0x1f11ab.href = _0x22a663;
      _0x1f11ab.download = _0x1098b1[0x0].download.split('_')[0x0] + "_Filtered Only Sets.zip";
      _0x1f11ab.click();
    });
  };
  document.getElementById('downloadAllFiltered').addEventListener("click", downloadAllFiltered);
  document.getElementById('clearAll').addEventListener('click', function () {
    document.getElementById("xmlFile").value = '';
    document.getElementById("setFile").value = '';
    document.getElementById("filter").value = '';
    document.getElementById("filter2").value = '';
    document.getElementById('setFileName').textContent = '';
    const _0x319ec5 = document.getElementById("results");
    while (_0x319ec5.firstChild) {
      _0x319ec5.removeChild(_0x319ec5.firstChild);
    }
  });
  document.getElementById('csv_files_2').addEventListener("change", function () {
    const _0x49963f = document.getElementById("file-list");
    const _0x11953c = Array.from(this.files);
    const _0x979df4 = _0x11953c.map(_0x5991b2 => _0x5991b2.name);
    _0x49963f.textContent = _0x979df4.join(", ");
    _0x49963f.title = _0x979df4.join("\n");
  });
  document.getElementById("uploadSetButton").addEventListener("change", function () {
    var _0x3b4bfc = this.files;
    for (var _0x42a976 = 0x0; _0x42a976 < _0x3b4bfc.length; _0x42a976++) {
      var _0x4ed91d = _0x3b4bfc[_0x42a976];
      var _0x434c07 = _0x4ed91d.name.split('.').pop().toLowerCase();
      if (_0x434c07 !== "set") {
        alert("Invalid file type. Please only upload .set files.");
        this.value = '';
        return;
      }
    }
  });
  document.getElementById("popupButton3").addEventListener("click", function (_0x40ecbf) {
    _0x40ecbf.preventDefault();
    document.getElementById("popupOverlay3").style.display = "flex";
  });
  document.getElementById("closeButton3").onclick = function (_0x226f0d) {
    _0x226f0d.preventDefault();
    document.getElementById("popupOverlay3").style.display = "none";
  };
  document.getElementById("popupOverlay3").onclick = function (_0x5dc990) {
    _0x5dc990.preventDefault();
    document.getElementById("popupOverlay3").style.display = "none";
  };
  document.getElementById("closeButton3").onclick = function () {
    document.getElementById("popupOverlay3").style.display = "none";
  };
  document.getElementById("popupOverlay3").onclick = function () {
    document.getElementById('popupOverlay3').style.display = 'none';
  };
  document.getElementById("SetEditor").onclick = function (_0x24fe85) {
    _0x24fe85.stopPropagation();
  };
  let setFileData = [];
  function handleSetFiles() {
    setFileData = [];
    let _0x160433 = document.querySelector(".table-container table");
    if (_0x160433) {
      _0x160433.remove();
    }
    let _0x4c6d66 = document.getElementById("uploadSetButton").files;
    let _0x469b20 = [];
    for (let _0x4281d9 = 0x0; _0x4281d9 < _0x4c6d66.length; _0x4281d9++) {
      let _0x41151f = _0x4c6d66[_0x4281d9];
      let _0x5a7f79 = new FileReader();
      let _0x195c10 = new Promise((_0x85e811, _0x3244cc) => {
        _0x5a7f79.onload = function (_0x6e75fb) {
          let _0x5c3da5 = _0x6e75fb.target.result;
          let {
            parameters: _0x5b171f,
            originalContent: _0xaacf78
          } = parseSetFile(_0x5c3da5);
          setFileData.push({
            'fileName': _0x41151f.name,
            'parameters': _0x5b171f,
            'originalContent': _0xaacf78,
            'fileId': _0x4281d9
          });
          _0x85e811();
        };
        _0x5a7f79.onerror = function (_0x42aeaf) {
          _0x3244cc(new Error("File reading failed"));
        };
        _0x5a7f79.readAsText(_0x41151f);
      });
      _0x469b20.push(_0x195c10);
    }
    Promise.all(_0x469b20).then(generateSetEditTable)["catch"](_0x23b1c2 => console.log(_0x23b1c2));
  }
  function parseSetFile(_0x588049) {
    const _0x8fa079 = _0x588049.split("\n");
    let _0x2fcc6f = {};
    let _0x45708b = {};
    for (let _0x42ee02 of _0x8fa079) {
      if (_0x42ee02.startsWith(';')) {
        _0x2fcc6f[_0x42ee02] = "HEADER";
        _0x45708b[_0x42ee02] = _0x42ee02;
        continue;
      }
      const _0x44bb6f = _0x42ee02.split('=', 0x2);
      const _0x63156d = _0x44bb6f[0x0];
      let _0xadf856 = _0x44bb6f[0x1];
      if (_0xadf856) {
        _0xadf856 = _0xadf856.split('||')[0x0];
      }
      _0x2fcc6f[_0x63156d] = _0xadf856;
      _0x45708b[_0x63156d] = _0x42ee02;
    }
    return {
      'parameters': _0x2fcc6f,
      'originalContent': _0x45708b
    };
  }
  function isSimilar(_0xc5bee9, _0x236bcf, _0x32826e) {
    let _0x35addf = parseFloat(_0xc5bee9);
    let _0x5904ae = parseFloat(_0x236bcf);
    if (isNaN(_0x35addf) || isNaN(_0x5904ae)) {
      return _0xc5bee9 === _0x236bcf;
    }
    let _0x57a8ce = Math.abs(_0x35addf - _0x5904ae);
    let _0xd5fdec = (_0x35addf + _0x5904ae) / 0x2;
    return _0x57a8ce / _0xd5fdec * 0x64 <= _0x32826e;
  }
  function generateSetEditTable() {
    let _0x23f7eb = parseFloat(document.getElementById('similarityPercentage').value);
    if (isNaN(_0x23f7eb)) {
      _0x23f7eb = 0x0;
    }
    let _0x48b960 = document.getElementById("includedParameters").value.split(',').map(_0x5ad106 => _0x5ad106.trim());
    let _0x328328 = document.getElementById("sameColor").value;
    function _0x4bfa8d(_0x11fe09) {
      let _0x5d09a1 = Array.from(_0x11fe09.querySelectorAll('td:not(.firstColumn)'));
      for (let _0x167fd3 of _0x5d09a1) {
        _0x167fd3.style.backgroundColor = '';
      }
      for (let _0x22605a = 0x0; _0x22605a < _0x5d09a1.length; _0x22605a++) {
        if (_0x5d09a1.some((_0x5381b4, _0x2349b5) => _0x2349b5 !== _0x22605a && _0x5381b4.textContent === _0x5d09a1[_0x22605a].textContent)) {
          _0x5d09a1[_0x22605a].style.backgroundColor = _0x328328;
        }
      }
    }
    let _0x5adce3 = document.createElement("table");
    let _0x4aa86d = document.createElement("thead");
    let _0x373c27 = document.createElement('tr');
    let _0x235ab1 = document.createElement('th');
    _0x235ab1.textContent = "Parameter Name";
    _0x373c27.appendChild(_0x235ab1);
    for (let _0x31c434 of setFileData) {
      let _0x2c96e6 = document.createElement('th');
      _0x2c96e6.textContent = _0x31c434.fileName;
      _0x2c96e6.contentEditable = 'true';
      _0x2c96e6.addEventListener('input', function () {
        _0x31c434.fileName = _0x2c96e6.textContent;
      });
      _0x373c27.appendChild(_0x2c96e6);
    }
    _0x4aa86d.appendChild(_0x373c27);
    _0x5adce3.appendChild(_0x4aa86d);
    let _0x569b2e = document.createElement("tbody");
    for (let _0x174e7b in setFileData[0x0].parameters) {
      if (setFileData[0x0].parameters[_0x174e7b] === "HEADER") {
        let _0x3c635f = document.createElement('tr');
        let _0x38ac9d = document.createElement('th');
        _0x38ac9d.colSpan = setFileData.length + 0x1;
        _0x38ac9d.textContent = _0x174e7b;
        _0x38ac9d.style.textAlign = "left";
        _0x38ac9d.style.backgroundColor = "#202020";
        _0x3c635f.appendChild(_0x38ac9d);
        _0x569b2e.appendChild(_0x3c635f);
        continue;
      }
      let _0x20a8d7 = document.createElement('tr');
      let _0x3c03c0 = document.createElement('td');
      _0x3c03c0.textContent = _0x174e7b;
      _0x3c03c0.classList.add("firstColumn");
      _0x20a8d7.appendChild(_0x3c03c0);
      for (let _0xfbbe6b of setFileData) {
        let _0x19eed2 = document.createElement('td');
        _0x19eed2.textContent = _0xfbbe6b.parameters[_0x174e7b] || '';
        _0x19eed2.contentEditable = "true";
        _0x19eed2.setAttribute('data-file', _0xfbbe6b.fileName);
        _0x19eed2.setAttribute('data-param', _0x174e7b);
        _0x19eed2.setAttribute("data-file-id", _0xfbbe6b.fileId);
        _0x19eed2.addEventListener("input", function () {
          if (_0x48b960.includes(_0x174e7b)) {
            _0x4bfa8d(_0x20a8d7);
          }
        });
        _0x20a8d7.appendChild(_0x19eed2);
      }
      if (_0x48b960.includes(_0x174e7b)) {
        _0x4bfa8d(_0x20a8d7);
      }
      _0x569b2e.appendChild(_0x20a8d7);
    }
    _0x5adce3.appendChild(_0x569b2e);
    document.querySelector(".table-container").appendChild(_0x5adce3);
  }
  function exportSetFiles() {
    let _0x18636d = new JSZip();
    let _0x15f32c = setFileData.length > 0x1;
    for (let _0x26f634 of setFileData) {
      let _0x51f8f8 = [];
      Object.keys(_0x26f634.originalContent).forEach(_0x1ed9b7 => {
        if (_0x1ed9b7.startsWith(';')) {
          _0x51f8f8.push(_0x1ed9b7);
          return;
        }
        let _0x16ace7 = document.querySelector("td[data-file-id=\"" + _0x26f634.fileId + "\"][data-param=\"" + _0x1ed9b7 + "\"]");
        let _0x25e0e7 = _0x26f634.originalContent[_0x1ed9b7];
        if (_0x16ace7 && _0x25e0e7) {
          _0x51f8f8.push(_0x1ed9b7 + '=' + _0x16ace7.textContent + (_0x90736b.length ? '||' + _0x90736b.join('||') : ''));
        } else {
          _0x51f8f8.push(_0x25e0e7);
        }
      });
      if (_0x15f32c) {
        _0x18636d.file(_0x26f634.fileName, _0x51f8f8.join("\n"));
      } else {
        let _0x558d85 = new Blob([_0x51f8f8.join("\n")], {
          'type': "text/plain"
        });
        let _0x6ba429 = document.createElement('a');
        _0x6ba429.href = URL.createObjectURL(_0x558d85);
        _0x6ba429.download = _0x26f634.fileName;
        _0x6ba429.click();
      }
    }
    if (_0x15f32c) {
      _0x18636d.generateAsync({
        'type': "blob"
      }).then(function (_0xe7b3d0) {
        let _0x40e2 = document.createElement('a');
        _0x40e2.href = URL.createObjectURL(_0xe7b3d0);
        _0x40e2.download = "editedSetFiles.zip";
        _0x40e2.click();
      });
    }
  }
  document.addEventListener("DOMContentLoaded", _0x47981f => {
    document.getElementById("exportSetButton").addEventListener('click', exportSetFiles);
    document.getElementById('uploadSetButton').addEventListener("change", handleSetFiles);
  });