<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="production">
                <h2 class="jh-entity-heading"><span>Production</span> {{production.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Prod Date</span>
                    </dt>
                    <dd>
                        <span>{{production.prodDate}}</span>
                    </dd>
                    <dt>
                        <span>Shift</span>
                    </dt>
                    <dd>
                        <span>{{production.shift}}</span>
                    </dd>
                    <dt>
                        <span>No Of Plates</span>
                    </dt>
                    <dd>
                        <span>{{production.noOfPlates}}</span>
                    </dd>
                    <dt>
                        <span>Prod Tonnage</span>
                    </dt>
                    <dd>
                        <span>{{production.prodTonnage}}</span>
                    </dd>
                    <dt>
                        <span>Manager</span>
                    </dt>
                    <dd>
                        <div v-if="production.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: production.manager.id}}">{{production.manager.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="production.id" :to="{name: 'ProductionEdit', params: {productionId: production.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./production-details.component.ts">
</script>
