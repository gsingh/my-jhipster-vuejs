<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="normalising">
                <h2 class="jh-entity-heading"><span>Normalising</span> {{normalising.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Normalising Date</span>
                    </dt>
                    <dd>
                        <span>{{normalising.normalisingDate}}</span>
                    </dd>
                    <dt>
                        <span>Shift</span>
                    </dt>
                    <dd>
                        <span>{{normalising.shift}}</span>
                    </dd>
                    <dt>
                        <span>No Of Plates</span>
                    </dt>
                    <dd>
                        <span>{{normalising.noOfPlates}}</span>
                    </dd>
                    <dt>
                        <span>Normalised Tonnage</span>
                    </dt>
                    <dd>
                        <span>{{normalising.normalisedTonnage}}</span>
                    </dd>
                    <dt>
                        <span>Manager</span>
                    </dt>
                    <dd>
                        <div v-if="normalising.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: normalising.manager.id}}">{{normalising.manager.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="normalising.id" :to="{name: 'NormalisingEdit', params: {normalisingId: normalising.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./normalising-details.component.ts">
</script>
