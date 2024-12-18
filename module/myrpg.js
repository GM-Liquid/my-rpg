console.log("My RPG System | �������� �������");


import { Character } from "templates/actors/actor-character.json";
import { Items } from "templates/actors/items.json";


Hooks.once('init', function () {
    // Add utility classes to the global game object so that they're more easily
    // accessible in global contexts.
    game.myrpg = {
        Character,
        Items,
    };
},

class MyRPGActor extends Actor {
    prepareData() {
        super.prepareData();
        const actorData = this.system;

        // ������� ������� ���������
        if (!actorData.attributes) {
            actorData.attributes = {
                body: { value: 10, label: "������������" },
                perception: { value: 10, label: "����������" },
                intellect: { value: 10, label: "���������" },
                reflexes: { value: 10, label: "��������" },
                conductivity: { value: 10, label: "������������" },
                willpower: { value: 10, label: "���� ����" }
            };
        }

        // ������ (���� ������, �� ��������� ������)
        // � �������: actorData.skills = { athletics: {value: 2, attribute: "body"} }
        if (!actorData.skills) {
            actorData.skills = {};
        }
    }
}