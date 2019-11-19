/*
 * =======================
 * Init patches
 * Fix reproducibility
 * https://github.com/jhipster/generator-jhipster/pull/10397
 */
function extend(Superclass, generator) {
    return class GeneratorExtender extends Superclass {
        constructor(args, opts) {
            super(args, opts);

            const recreateChangelog = function() {
                if (!this.options.recreateDate) return;
                // Reset counter;
                delete this.configOptions.lastChangelogDate;
                const self = this;
                this.getExistingEntities().forEach(entity => {
                    // Recreate changelog
                    entity.definition.changelogDate = self.dateFormatForLiquibase();

                    const filePath = path.join('.jhipster', `${entity.name}.json`);
                    fs.writeFileSync(filePath, JSON.stringify(entity.definition, null, 4).concat('\n'));
                    self.fs.writeJSON(filePath, entity.definition, null, 4);
                });
            }
            if (generator === 'common') {
                this.queueMethod(recreateChangelog, 'recreateChangelog', 'configuring');
            }
        }

        dateFormatForLiquibase() {
            let now = new Date();
            if (this.configOptions.lastChangelogDate !== undefined) {
                now = this.configOptions.lastChangelogDate;
                now.setMinutes(now.getMinutes() + 1);
            } else {
                const creationTimestamp = this.options.creationTimestamp;
                if (creationTimestamp !== undefined) {
                    this.log(`Using creationTimestamp ${creationTimestamp}`);
                    const time = Date.parse(creationTimestamp);
                    if (time) {
                        now = new Date(time);
                        this.blueprintConfig.set('creationTimestamp', now);
                        now.setMinutes(now.getMinutes() + 1);
                        this.configOptions.lastChangelogDate = now;
                    } else {
                        this.log(`Error parsing creationTimestamp ${creationTimestamp}`);
                    }
                }
            }
            const nowUTC = new Date(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate(),
                now.getUTCHours(),
                now.getUTCMinutes(),
                now.getUTCSeconds()
            );
            const year = `${nowUTC.getFullYear()}`;
            let month = `${nowUTC.getMonth() + 1}`;
            if (month.length === 1) {
                month = `0${month}`;
            }
            let day = `${nowUTC.getDate()}`;
            if (day.length === 1) {
                day = `0${day}`;
            }
            let hour = `${nowUTC.getHours()}`;
            if (hour.length === 1) {
                hour = `0${hour}`;
            }
            let minute = `${nowUTC.getMinutes()}`;
            if (minute.length === 1) {
                minute = `0${minute}`;
            }
            let second = `${nowUTC.getSeconds()}`;
            if (second.length === 1) {
                second = `0${second}`;
            }
            return `${year}${month}${day}${hour}${minute}${second}`;
        }
    };
}

module.exports = {
    extend
};
