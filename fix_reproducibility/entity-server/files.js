const path = require('path');

const jhipsterEnv = require('generator-jhipster-customizer');
const randexp = require(`${jhipsterEnv.packagePath}/node_modules/randexp`);
const faker = require(`${jhipsterEnv.packagePath}/node_modules/faker`);

const jhipsterConstants = jhipsterEnv.constants;

// In order to have consistent results with Faker, the seed is fixed.
faker.seed(42);

/*
 * Current faker version is 4.1.0 and was release in 2017
 * It is outdated
 * https://github.com/Marak/faker.js/blob/10bfb9f467b0ac2b8912ffc15690b50ef3244f09/lib/date.js#L73-L96
 * Needed for reproducible builds
 */
/* eslint-disable-next-line */
const recentDate = function (days, refDate) {
    /* eslint-disable */
    var date = new Date();
    if (typeof refDate !== "undefined") {
        date = new Date(Date.parse(refDate));
    }

    var range = {
            min: 1000,
            max: (days || 1) * 24 * 3600 * 1000
    };

    var future = date.getTime();
    future -= faker.random.number(range); // some time from now to N days ago, in milliseconds
    date.setTime(future);

    return date;
};

const recentForLiquibase = function (days, changelogDate) {
    let formatedDate;
    if (changelogDate !== undefined) {
        formatedDate = changelogDate.substring(0, 4) + '-' + changelogDate.substring(4, 6) + '-' + changelogDate.substring(6, 8);
    }
    return recentDate(1, formatedDate);
}

module.exports = {
    prefix: path.join(__dirname, '../templates'),
    files: {
        tenant_base: [
            {
                condition: generator => generator.databaseType === 'sql',
                path: jhipsterConstants.SERVER_MAIN_RES_DIR,
                templates: [
                    {
                        file: 'config/liquibase/fake-data/table.csv',
                        options: {
                            interpolate: jhipsterConstants.INTERPOLATE_REGEX,
                            context: {
                                faker,
                                recentForLiquibase,
                                randexp
                            }
                        },
                        renameTo: generator => `config/liquibase/fake-data/${generator.entityTableName}.csv`
                    }
                ]
            }
        ]
    }
};
