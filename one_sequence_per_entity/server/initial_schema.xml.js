const file = gen => `${gen.SERVER_MAIN_RES_DIR}config/liquibase/changelog/00000000000000_initial_schema.xml`;

const tmpls = [
    {
        type: 'replaceContent',
        debug: true,
        target: /^^\n((\s*)<.*id="00000000000000")/m,
        tmpl: `
$2<property name="incrementBy" value="50" global="true" context="prod"/>
$2<property name="incrementBy" value="1" global="true" context="dev"/>

$2<changeSet id="00000000000010" author="jhipster">
$2$2<createSequence sequenceName="user_sequence_generator" startValue="1050" incrementBy="\${incrementBy}"/>
$2</changeSet>

$1`
    },
    {
        type: 'replaceContent',
        target: /(createSequence(.*) incrementBy=)"\w*"/,
        tmpl: '$1"\${incrementBy}"'
    }
];

module.exports = {
    file,
    tmpls
};
