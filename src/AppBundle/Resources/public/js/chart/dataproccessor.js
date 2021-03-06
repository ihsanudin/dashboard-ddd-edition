Chart.processDataPerBulan = function (data, type) {
    Chart.scope = data['scope'];
    var output = [];
    output['total'] = 0;
    var i = 0;

    jQuery.each(data['data'], function (key, value) {
        var data = [];
        var nominal = [];
        output[i] = [];

        output[i]['name'] = key;
        output[i]['type'] = type;

        jQuery.each(value, function (k, v) {
            if ('undefined' !== typeof v['value']) {
                data.push(parseInt(v['value']));
                nominal.push(parseInt(v['nominator']));
                output['total'] = output['total'] + parseInt(v['nominator']);
            } else {
                data.push(0);
            }
        });

        output[i]['data'] = data;
        output[i]['nominal'] = nominal;

        i++;
    });

    return output;
};

Chart.processDataGlobal = function (data) {
    var output = [];
    output['indikator'] = [];
    output['data'] = [];
    output['data']['data'] = [];
    output['data']['total'] = 0;
    output['data']['year'] = null;
    var total = 0;

    jQuery.each(data, function (key, value) {
        output['indikator'].push(value.indikator.code);
        output['data']['data'][key] = 0;

        jQuery.each(value.data, function (k, v) {
            if (null === output['data']['year']) {
                output['data']['year'] = k;
            }

            total = Object.keys(v).length;
            jQuery.each(v, function (x, y) {
                output['data']['data'][key] = output['data']['data'][key] + parseInt(y.value);
                output['data']['total'] = output['data']['total'] + parseInt(y.nominator);
            });
        });

        output['data']['data'][key] = Math.round(output['data']['data'][key] / total);
    });

    output['data']['name'] = output['data']['year'];

    return output;
};

Chart.formatNumber = function (number, tousandSeperator) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, tousandSeperator);
};