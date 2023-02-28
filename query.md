g.V("India-e30447eb-1545-436f-a565-582d8acf5f3c").hasLabel('Country').as('country')
.repeat(out()).emit().hasLabel('IotDevice')


