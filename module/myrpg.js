console.log("My RPG System | �������� �������");


import { Character } from "templates/actors/actor-character.json";
import { Items } from "templates/actors/items.json";


Hooks.once('init', function () {
    // Add utility classes to the global game object so that they're more easily
    // accessible in global contexts.
    game.boilerplate = {
        BoilerplateActor,
        BoilerplateItem,
        rollItemMacro,
    };

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

class MyRPGActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["my-rpg", "sheet", "actor"],
            template: "systems/my-rpg/templates/actors/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
        });
    }

    getData(options) {
        const context = super.getData(options);
        const actorData = context.actor.system;

        context.attributes = actorData.attributes;
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // ��� ��������� �������� ��������:
        html.find('.attribute-input').change(ev => {
            const input = ev.currentTarget;
            const attributeKey = input.dataset.key;
            const newValue = Number(input.value);
            if (!Number.isNaN(newValue)) {
                // ��������� ������ ����� ����� update
                this.actor.update({ [`system.attributes.${attributeKey}.value`]: newValue });
            }
        });
    }
}

class MyRPGActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["my-rpg", "sheet", "actor"],
            template: "systems/my-rpg/templates/actors/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
        });
    }

    getData(options) {
        const context = super.getData(options);
        const actorData = context.actor.system; // � v10+ ������ ����� � actor.system

        // ��������� � ������ ��������
        context.attributes = actorData.attributes;
        // � ������� ������� ������

        return context;
    }
}

class MyRPGItem extends Item {
    prepareData() {
        super.prepareData();
        // ����������, ����� � ������� ������ ���������.
    }
}

class MyRPGActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["my-rpg", "sheet", "actor"],
            template: "systems/my-rpg/templates/actors/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
        });
    }

    getData(options) {
        const data = super.getData(options);
        // data.actor ������������ ������ �����.
        // ����� ����� ����� �������� ��������, ������ � �.�.
        return data;
    }
}

class MyRPGItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["my-rpg", "sheet", "item"],
            template: "systems/my-rpg/templates/items/item-sheet.html",
            width: 400,
            height: 300
        });
    }

    getData(options) {
        const data = super.getData(options);
        // data.item - ������ ��������.
        return data;
    }
}

// ������������ ��������
async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/my-rpg/templates/actors/actor-sheet.html",
        "systems/my-rpg/templates/items/item-sheet.html"
    ];
    return loadTemplates(templatePaths);
}

Hooks.once("init", () => {
    console.log("My RPG System | �������������...");

    // ������������ ������ ����������
    CONFIG.Actor.documentClass = MyRPGActor;
    CONFIG.Item.documentClass = MyRPGItem;

    // ������� ����������� �����
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);

    // ������������ ���� �����
    Actors.registerSheet("my-rpg", MyRPGActorSheet, { makeDefault: true });
    Items.registerSheet("my-rpg", MyRPGItemSheet, { makeDefault: true });

    // ������������� �������
    preloadHandlebarsTemplates();
});
