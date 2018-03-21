const Logger = require('logplease');
const logger = Logger.create('HMRC42');
var fs = require('fs');

export class HMRC42 {

    templatePath: String = 'HM-RC-4-2.json';
    deviceName: String;
    template;
    plugin;

    init(plugin) {
        logger.debug('init(%s)', JSON.stringify(plugin));
        this.plugin = plugin;
        this.deviceName = plugin.deviceName;
        var file = fs.readFileSync('src/devices/' + this.templatePath, 'utf8');
        file = file.replace(/%ADDRESS%/g, this.deviceName);
        this.template = JSON.parse(file);
        logger.info('Device %s of plugin %s initialized.', this.deviceName, this.plugin.name);
    }

    getChannels() {
        return this.template.channels;
    }

    getParamset(name, type) {
        logger.debug('getParamset(%s,%s)', name, type);
        for(let i=0; i<this.template.paramsets.length; i++) {
            var p = this.template.paramsets[i];
            if((p.name.indexOf(name) > -1) && p.type === type) {
                return p;
            }
        };
        return null;
    }

    getParamsetDescription(name, type) {
        logger.debug('getParamsetDescription(%s,%s)', name, type);
        for(let i=0; i<this.template.paramsetDescriptions.length; i++) {
            var pd = this.template.paramsetDescriptions[i];
            if((pd.name.indexOf(name) > -1) && pd.type === type) {
                return pd;
            }
        };
        return null;
    }

    putParamset(ps) {
        //TODO
    }

}