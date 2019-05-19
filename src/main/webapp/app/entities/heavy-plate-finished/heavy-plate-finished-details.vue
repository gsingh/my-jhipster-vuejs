<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="heavyPlateFinished">
                <h2 class="jh-entity-heading"><span>HeavyPlateFinished</span> {{heavyPlateFinished.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>H P Finished Date</span>
                    </dt>
                    <dd>
                        <span>{{heavyPlateFinished.hPFinishedDate}}</span>
                    </dd>
                    <dt>
                        <span>Shift</span>
                    </dt>
                    <dd>
                        <span>{{heavyPlateFinished.shift}}</span>
                    </dd>
                    <dt>
                        <span>No Of Plates</span>
                    </dt>
                    <dd>
                        <span>{{heavyPlateFinished.noOfPlates}}</span>
                    </dd>
                    <dt>
                        <span>H P Finished Tonnage</span>
                    </dt>
                    <dd>
                        <span>{{heavyPlateFinished.hPFinishedTonnage}}</span>
                    </dd>
                    <dt>
                        <span>Manager</span>
                    </dt>
                    <dd>
                        <div v-if="heavyPlateFinished.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: heavyPlateFinished.manager.id}}">{{heavyPlateFinished.manager.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="heavyPlateFinished.id" :to="{name: 'HeavyPlateFinishedEdit', params: {heavyPlateFinishedId: heavyPlateFinished.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./heavy-plate-finished-details.component.ts">
</script>
