const file = gen => `${gen.SERVER_MAIN_RES_DIR}config/liquibase/changelog/00000000000000_initial_schema.xml`;

const tmpls = [
    {
        type: 'replaceContent',
        target: /^^\n((\s*)<.*id="00000000000000")/m,
        tmpl: `
    <property name="incrementBy" value="50" global="true" context="prod"/>
    <property name="incrementBy" value="1" global="true" context="dev"/>

    <changeSet id="00000000000010" author="jhipster">
        <createSequence sequenceName="user_sequence_generator" startValue="1050" incrementBy="\${incrementBy}"/>
    </changeSet>

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
